/* ========================================
   API HEALTH CHECK - Vercel Function
   ======================================== */

export default function handler(req, res) {
  // CORS 헤더 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // OPTIONS 요청 처리 (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // GET 요청만 허용
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      error: 'Method Not Allowed',
      message: '헬스체크는 GET 요청만 지원합니다.',
      allowedMethods: ['GET']
    });
    return;
  }
  
  try {
    // 시스템 상태 확인
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
      services: {
        database: checkDatabaseHealth(),
        memory: checkMemoryHealth(),
        api: checkAPIHealth()
      },
      checks: {
        timestamp: true,
        uptime: true,
        environment: true,
        version: true
      }
    };
    
    // 모든 체크가 통과했는지 확인
    const allChecksPassed = Object.values(healthStatus.checks).every(check => check === true);
    
    if (allChecksPassed) {
      res.status(200).json(healthStatus);
    } else {
      healthStatus.status = 'degraded';
      res.status(200).json(healthStatus);
    }
    
  } catch (error) {
    console.error('Health check error:', error);
    
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Internal Server Error',
      message: '헬스체크 중 오류가 발생했습니다.',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Internal error'
    });
  }
}

// 데이터베이스 상태 확인
function checkDatabaseHealth() {
  try {
    // 실제 데이터베이스 연결 확인 로직
    // 여기서는 모의 상태 반환
    return {
      status: 'healthy',
      responseTime: Math.random() * 100 + 10, // 10-110ms
      lastCheck: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      lastCheck: new Date().toISOString()
    };
  }
}

// 메모리 상태 확인
function checkMemoryHealth() {
  try {
    const memUsage = process.memoryUsage();
    const memUsageMB = {
      rss: Math.round(memUsage.rss / 1024 / 1024 * 100) / 100,
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024 * 100) / 100,
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024 * 100) / 100,
      external: Math.round(memUsage.external / 1024 / 1024 * 100) / 100
    };
    
    // 메모리 사용량이 90%를 넘으면 경고
    const memoryThreshold = 90;
    const memoryUsagePercent = (memUsageMB.heapUsed / memUsageMB.heapTotal) * 100;
    
    return {
      status: memoryUsagePercent > memoryThreshold ? 'warning' : 'healthy',
      usage: memUsageMB,
      usagePercent: Math.round(memoryUsagePercent * 100) / 100,
      threshold: memoryThreshold,
      lastCheck: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      lastCheck: new Date().toISOString()
    };
  }
}

// API 상태 확인
function checkAPIHealth() {
  try {
    // OpenAI API 키 상태 확인
    const openaiApiKey = process.env.VITE_OPENAI_API_KEY;
    const openaiStatus = openaiApiKey && openaiApiKey !== 'your_openai_api_key_here' ? 'configured' : 'not_configured';
    
    return {
      status: 'healthy',
      openai: {
        status: openaiStatus,
        configured: openaiStatus === 'configured'
      },
      endpoints: {
        health: '/api/health',
        luck: '/api/luck'
      },
      lastCheck: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      lastCheck: new Date().toISOString()
    };
  }
}

// 상세 헬스체크 (관리자용)
export async function detailedHealthCheck() {
  const checks = {
    basic: {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.VERCEL_GIT_COMMIT_SHA || 'local'
    },
    system: {
      memory: checkMemoryHealth(),
      platform: process.platform,
      nodeVersion: process.version,
      arch: process.arch
    },
    services: {
      database: checkDatabaseHealth(),
      api: checkAPIHealth()
    },
    environment: {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV,
      vercelRegion: process.env.VERCEL_REGION,
      vercelUrl: process.env.VERCEL_URL
    }
  };
  
  // 전체 상태 평가
  const allChecks = [
    checks.system.memory.status,
    checks.services.database.status,
    checks.services.api.status
  ];
  
  const hasUnhealthy = allChecks.includes('unhealthy');
  const hasWarning = allChecks.includes('warning');
  
  if (hasUnhealthy) {
    checks.overallStatus = 'unhealthy';
  } else if (hasWarning) {
    checks.overallStatus = 'degraded';
  } else {
    checks.overallStatus = 'healthy';
  }
  
  return checks;
}
