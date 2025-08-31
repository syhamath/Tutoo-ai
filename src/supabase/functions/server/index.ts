import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/middleware';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// CORS middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Logger middleware
app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Auth helper function
async function getAuthenticatedUser(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return null;
  }
  
  return user;
}

// Routes prefixed with /make-server-ad5853f1

// Health check
app.get('/make-server-ad5853f1/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// User authentication and management
app.post('/make-server-ad5853f1/auth/signup', async (c) => {
  try {
    const { email, password, nickname, userType = 'student' } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        nickname,
        userType,
        avatar: 'football',
        level: 1,
        xp: 0,
        totalXp: 0,
        streak: 0,
        createdAt: new Date().toISOString()
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ success: false, error: error.message }, 400);
    }

    // Store additional user profile data in KV store
    const userProfile = {
      id: data.user.id,
      nickname,
      userType,
      avatar: 'football',
      level: 1,
      xp: 0,
      xpToNextLevel: 200,
      totalXp: 0,
      streak: 0,
      badges: [],
      unlockedStickers: [],
      weeklyProgress: [],
      areasToImprove: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`user_profile_${data.user.id}`, JSON.stringify(userProfile));

    return c.json({
      success: true,
      data: {
        user: data.user,
        profile: userProfile
      }
    });

  } catch (error) {
    console.log('Signup processing error:', error);
    return c.json({ 
      success: false, 
      error: 'Error creating user account: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, 500);
  }
});

// Get user profile
app.get('/make-server-ad5853f1/users/:userId/profile', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);
    
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const userId = c.req.param('userId');
    const profileData = await kv.get(`user_profile_${userId}`);
    
    if (!profileData) {
      return c.json({ success: false, error: 'Profile not found' }, 404);
    }

    const profile = JSON.parse(profileData);
    return c.json({ success: true, data: profile });

  } catch (error) {
    console.log('Get profile error:', error);
    return c.json({ 
      success: false, 
      error: 'Error retrieving user profile: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, 500);
  }
});

// Update user profile
app.patch('/make-server-ad5853f1/users/:userId/profile', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);
    
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const userId = c.req.param('userId');
    const updates = await c.req.json();
    
    const existingData = await kv.get(`user_profile_${userId}`);
    if (!existingData) {
      return c.json({ success: false, error: 'Profile not found' }, 404);
    }

    const profile = JSON.parse(existingData);
    const updatedProfile = {
      ...profile,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`user_profile_${userId}`, JSON.stringify(updatedProfile));

    return c.json({ success: true, data: updatedProfile });

  } catch (error) {
    console.log('Update profile error:', error);
    return c.json({ 
      success: false, 
      error: 'Error updating user profile: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, 500);
  }
});

// Progress tracking
app.post('/make-server-ad5853f1/progress', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);
    
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const progress = await c.req.json();
    const progressId = `progress_${user.id}_${Date.now()}`;
    
    const progressData = {
      ...progress,
      userId: user.id,
      timestamp: new Date().toISOString(),
      id: progressId
    };

    await kv.set(progressId, JSON.stringify(progressData));

    // Update user profile with XP and level progression
    const profileData = await kv.get(`user_profile_${user.id}`);
    if (profileData) {
      const profile = JSON.parse(profileData);
      const newXp = profile.xp + (progress.xpEarned || 0);
      const newTotalXp = profile.totalXp + (progress.xpEarned || 0);
      
      // Level up logic
      let newLevel = profile.level;
      let remainingXp = newXp;
      const xpToNextLevel = newLevel * 200;

      while (remainingXp >= xpToNextLevel) {
        remainingXp -= xpToNextLevel;
        newLevel++;
      }

      const updatedProfile = {
        ...profile,
        xp: remainingXp,
        level: newLevel,
        totalXp: newTotalXp,
        xpToNextLevel: newLevel * 200,
        updatedAt: new Date().toISOString()
      };

      await kv.set(`user_profile_${user.id}`, JSON.stringify(updatedProfile));
    }

    return c.json({ success: true, data: progressData });

  } catch (error) {
    console.log('Progress tracking error:', error);
    return c.json({ 
      success: false, 
      error: 'Error tracking progress: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, 500);
  }
});

// Get user progress
app.get('/make-server-ad5853f1/users/:userId/progress', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);
    
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const userId = c.req.param('userId');
    const progressEntries = await kv.getByPrefix(`progress_${userId}_`);
    
    const progress = progressEntries.map(entry => JSON.parse(entry));
    progress.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return c.json({ success: true, data: progress });

  } catch (error) {
    console.log('Get progress error:', error);
    return c.json({ 
      success: false, 
      error: 'Error retrieving progress: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, 500);
  }
});

// Course management
app.get('/make-server-ad5853f1/courses', async (c) => {
  try {
    const subject = c.req.query('subject');
    const coursesData = await kv.getByPrefix('course_');
    
    let courses = coursesData.map(data => JSON.parse(data));
    
    if (subject) {
      courses = courses.filter(course => course.subject === subject);
    }

    return c.json({ success: true, data: courses });

  } catch (error) {
    console.log('Get courses error:', error);
    return c.json({ 
      success: false, 
      error: 'Error retrieving courses: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, 500);
  }
});

app.post('/make-server-ad5853f1/courses', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);
    
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const courseData = await c.req.json();
    const courseId = `course_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    const course = {
      id: courseId,
      ...courseData,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(courseId, JSON.stringify(course));

    return c.json({ success: true, data: course });

  } catch (error) {
    console.log('Create course error:', error);
    return c.json({ 
      success: false, 
      error: 'Error creating course: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, 500);
  }
});

// AI Assistant
app.post('/make-server-ad5853f1/ai/chat', async (c) => {
  try {
    const { query, context, language = 'fr' } = await c.req.json();
    
    // Simple AI responses based on keywords - replace with actual AI integration
    const responses = {
      fr: {
        math: "Pour résoudre ce problème de mathématiques, commençons par identifier les éléments clés. Peux-tu me dire quel type de calcul tu essaies de faire? 🧮",
        french: "En français, il est important de bien comprendre la structure de la phrase. Regarde d'abord le sujet, puis le verbe, et enfin le complément. 📚",
        science: "Les sciences sont fascinantes! Cette question touche à un concept important. Laisse-moi t'expliquer étape par étape... 🔬",
        history: "L'histoire nous aide à comprendre le présent. Cette période ou cet événement a eu des conséquences importantes... 🏛️",
        geography: "La géographie nous permet de mieux comprendre notre monde. Cette région a des caractéristiques particulières... 🌍",
        default: "C'est une excellente question! Peux-tu me donner plus de contexte pour que je puisse mieux t'aider? 🦉"
      },
      ar: {
        math: "لحل هذه المسألة الرياضية، دعنا نحدد العناصر الأساسية أولاً. هل يمكنك إخباري بنوع الحساب الذي تحاول القيام به؟ 🧮",
        french: "في اللغة الفرنسية، من المهم فهم بنية الجملة جيداً. انظر أولاً إلى الفاعل، ثم الفعل، وأخيراً المفعول به. 📚",
        science: "العلوم رائعة! هذا السؤال يتعلق بمفهوم مهم. دعني أشرح لك خطوة بخطوة... 🔬",
        history: "التاريخ يساعدنا على فهم الحاضر. هذه الفترة أو الحدث كان له عواقب مهمة... 🏛️",
        geography: "الجغرافيا تتيح لنا فهم عالمنا بشكل أفضل. هذه المنطقة لها خصائص خاصة... 🌍",
        default: "سؤال ممتاز! هل يمكنك إعطائي المزيد من السياق لأتمكن من مساعدتك بشكل أفضل؟ 🦉"
      }
    };

    const langResponses = responses[language as 'fr' | 'ar'] || responses.fr;
    const queryLower = query.toLowerCase();

    let response: string;
    if (queryLower.includes('math') || queryLower.includes('calcul') || queryLower.includes('nombre') || queryLower.includes('رياضيات') || queryLower.includes('حساب')) {
      response = langResponses.math;
    } else if (queryLower.includes('français') || queryLower.includes('grammaire') || queryLower.includes('فرنسية') || queryLower.includes('نحو')) {
      response = langResponses.french;
    } else if (queryLower.includes('science') || queryLower.includes('علوم') || queryLower.includes('تجربة')) {
      response = langResponses.science;
    } else if (queryLower.includes('histoire') || queryLower.includes('تاريخ') || queryLower.includes('حدث')) {
      response = langResponses.history;
    } else if (queryLower.includes('géographie') || queryLower.includes('جغرافيا') || queryLower.includes('مكان')) {
      response = langResponses.geography;
    } else {
      response = langResponses.default;
    }

    // Store the conversation for learning purposes
    const conversationId = `conversation_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const conversation = {
      id: conversationId,
      query,
      response,
      context,
      language,
      timestamp: new Date().toISOString()
    };
    
    await kv.set(conversationId, JSON.stringify(conversation));

    return c.json({ 
      success: true, 
      data: { 
        response,
        suggestions: [
          language === 'fr' ? "Peux-tu me donner un exemple?" : "هل يمكنك إعطائي مثالاً؟",
          language === 'fr' ? "Veux-tu que j'explique autrement?" : "هل تريد أن أشرح بطريقة أخرى؟",
          language === 'fr' ? "As-tu d'autres questions?" : "هل لديك أسئلة أخرى؟"
        ]
      }
    });

  } catch (error) {
    console.log('AI chat error:', error);
    return c.json({ 
      success: false, 
      error: 'Error processing AI request: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, 500);
  }
});

// Sync offline data
app.post('/make-server-ad5853f1/sync', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);
    
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const { updates } = await c.req.json();
    
    for (const update of updates) {
      const syncId = `sync_${user.id}_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      await kv.set(syncId, JSON.stringify({
        ...update,
        userId: user.id,
        syncedAt: new Date().toISOString()
      }));
    }

    return c.json({ 
      success: true, 
      message: `Successfully synced ${updates.length} updates`
    });

  } catch (error) {
    console.log('Sync error:', error);
    return c.json({ 
      success: false, 
      error: 'Error syncing data: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, 500);
  }
});

// Analytics
app.get('/make-server-ad5853f1/users/:userId/analytics', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);
    
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const userId = c.req.param('userId');
    const timeframe = c.req.query('timeframe') || 'week';
    
    const progressEntries = await kv.getByPrefix(`progress_${userId}_`);
    const progress = progressEntries.map(entry => JSON.parse(entry));
    
    // Calculate analytics based on timeframe
    const now = new Date();
    let startDate: Date;
    
    switch (timeframe) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
    
    const filteredProgress = progress.filter(p => 
      new Date(p.timestamp) >= startDate
    );
    
    const analytics = {
      totalLessons: filteredProgress.filter(p => p.completed).length,
      totalXP: filteredProgress.reduce((sum, p) => sum + (p.xpEarned || 0), 0),
      totalTimeSpent: filteredProgress.reduce((sum, p) => sum + (p.timeSpent || 0), 0),
      averageStars: filteredProgress.length > 0 ? 
        filteredProgress.reduce((sum, p) => sum + (p.stars || 0), 0) / filteredProgress.length : 0,
      timeframe,
      startDate: startDate.toISOString(),
      endDate: now.toISOString()
    };

    return c.json({ success: true, data: analytics });

  } catch (error) {
    console.log('Analytics error:', error);
    return c.json({ 
      success: false, 
      error: 'Error generating analytics: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, 500);
  }
});

// Badge system
app.post('/make-server-ad5853f1/users/:userId/badges/:badgeId/claim', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const user = await getAuthenticatedUser(authHeader);
    
    if (!user) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const userId = c.req.param('userId');
    const badgeId = c.req.param('badgeId');
    
    const profileData = await kv.get(`user_profile_${userId}`);
    if (!profileData) {
      return c.json({ success: false, error: 'Profile not found' }, 404);
    }

    const profile = JSON.parse(profileData);
    
    // Check if badge already claimed
    const existingBadge = profile.badges.find((b: any) => b.id === badgeId);
    if (existingBadge?.earned) {
      return c.json({ success: false, error: 'Badge already claimed' }, 400);
    }

    // Add or update badge
    const badgeIndex = profile.badges.findIndex((b: any) => b.id === badgeId);
    const badge = {
      id: badgeId,
      earned: true,
      earnedDate: new Date().toISOString()
    };

    if (badgeIndex >= 0) {
      profile.badges[badgeIndex] = { ...profile.badges[badgeIndex], ...badge };
    } else {
      profile.badges.push(badge);
    }

    profile.updatedAt = new Date().toISOString();
    await kv.set(`user_profile_${userId}`, JSON.stringify(profile));

    return c.json({ success: true, data: badge });

  } catch (error) {
    console.log('Badge claim error:', error);
    return c.json({ 
      success: false, 
      error: 'Error claiming badge: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, 500);
  }
});

// Start the server
Deno.serve(app.fetch);