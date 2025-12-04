import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { LogOut, Download, Check, AlertCircle } from 'lucide-react';
=======
import { LogOut, Check, AlertCircle } from 'lucide-react';
>>>>>>> 02c748d (Initial commit)

export default function DiscordVerification() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasRole, setHasRole] = useState(false);
  const [verifying, setVerifying] = useState(false);
<<<<<<< HEAD
=======
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
>>>>>>> 02c748d (Initial commit)

  // Configuration - UPDATE THESE WITH YOUR VALUES
  const CLIENT_ID = '1445888519506497546';
  const REDIRECT_URI = 'https://upl-auth.vercel.app';
  const GUILD_ID = '1356692600869879889';
  const REQUIRED_ROLE_ID = '1356693648116547590';
  const SCOPES = 'identify guilds.members.read';
<<<<<<< HEAD
=======
  const REPO_URL = 'https://github.com/Bossman2018312/discord-Auth';
>>>>>>> 02c748d (Initial commit)

  const getAuthUrl = () => {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
      scope: SCOPES,
    });
    return `https://discord.com/api/oauth2/authorize?${params}`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    if (code && !user) {
      exchangeCodeForToken(code);
    }
  }, [user]);

  const exchangeCodeForToken = async (code) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: 'TC1WOAn4FOsSD2rudIbXTRu4b8AWKhm1',
          code,
          grant_type: 'authorization_code',
          redirect_uri: REDIRECT_URI,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const data = await response.json();
      await getUserData(data.access_token);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getUserData = async (accessToken) => {
    try {
      const response = await fetch('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) throw new Error('Failed to fetch user data');

      const userData = await response.json();
      setUser({ username: userData.username, id: userData.id, accessToken });
      await checkUserRole(userData.id, accessToken);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const checkUserRole = async (userId, accessToken) => {
    setVerifying(true);
    try {
      const response = await fetch(
        `https://discord.com/api/users/@me/guilds/${GUILD_ID}/member`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!response.ok) {
        setError('Not a member of the required server');
        setVerifying(false);
        return;
      }

      const memberData = await response.json();
      const hasRequiredRole = memberData.roles.includes(REQUIRED_ROLE_ID);
      setHasRole(hasRequiredRole);

      if (!hasRequiredRole) {
        setError('You need the required role to download files');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setVerifying(false);
    }
  };

<<<<<<< HEAD
  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = 'https://raw.githubusercontent.com/Bossman2018312/discord-verification/main/public/UPIF-Import.zip';
    link.download = 'UPIF-Import.zip';
    link.click();
  };
=======

>>>>>>> 02c748d (Initial commit)

  const handleLogout = () => {
    setUser(null);
    setHasRole(false);
    setError('');
<<<<<<< HEAD
=======
    setDownloadProgress(0);
>>>>>>> 02c748d (Initial commit)
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {!user ? (
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-purple-500/20">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.405-.875-.616-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.295a.077.077 0 0 1-.007.127c-.598.35-1.225.645-1.873.893a.077.077 0 0 0-.041.107c.359.698.77 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.718-.838-8.812-3.549-12.456a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.946-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.946-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">UPL Verification</h1>
              <p className="text-gray-400 text-sm">Sign in with Discord to access exclusive content</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <a
              href={getAuthUrl()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.405-.875-.616-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.295a.077.077 0 0 1-.007.127c-.598.35-1.225.645-1.873.893a.077.077 0 0 0-.041.107c.359.698.77 1.364 1.225 1.994a.076.076 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.718-.838-8.812-3.549-12.456a.061.061 0 0 0-.031-.03zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.946-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.946-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Continue with Discord
            </a>
          </div>
        ) : (
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-purple-500/20">
            <div className="text-center mb-8">
<<<<<<< HEAD
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white">{user.username}</h2>
              <p className="text-gray-400 text-sm mt-2">ID: {user.id}</p>
=======
              <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white mb-3">{user.username}</h2>
              <p className="text-gray-300 text-sm mb-6">ID: {user.id}</p>
              <div className="flex items-center justify-center gap-2 text-green-400 mb-4">
                <Check className="w-5 h-5" />
                <span className="font-semibold">Verified</span>
              </div>
>>>>>>> 02c748d (Initial commit)
            </div>

            {verifying ? (
              <div className="text-center py-8">
                <div className="animate-spin w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full mx-auto"></div>
                <p className="text-gray-300 mt-3 font-medium">Verifying access...</p>
              </div>
            ) : hasRole ? (
              <div>
<<<<<<< HEAD
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-200 font-semibold">Access Granted</p>
                    <p className="text-green-300 text-xs mt-1">You have verified successfully</p>
                  </div>
                </div>

                <button
                  onClick={downloadFile}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mb-4 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Download File
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
=======
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6 text-center">
                  <p className="text-green-200 font-semibold text-lg">Access Granted</p>
                  <p className="text-green-300 text-sm mt-2">You have verified successfully</p>
                </div>

                {downloading && (
                  <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-blue-200 font-semibold text-sm">Downloading...</p>
                      <p className="text-blue-300 text-xs">{downloadProgress}%</p>
                    </div>
                    <div className="w-full bg-blue-900/30 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${downloadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}



                <button
                  onClick={handleLogout}
                  disabled={downloading}
                  className={`w-full ${downloading ? 'bg-gray-700 cursor-not-allowed' : 'bg-slate-700 hover:bg-slate-600'} text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2`}
>>>>>>> 02c748d (Initial commit)
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div>
<<<<<<< HEAD
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-200 text-sm">You don't have the required role to access this</p>
=======
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 text-center">
                  <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                  <p className="text-red-200 font-semibold">Access Denied</p>
                  <p className="text-red-300 text-sm mt-2">You don't have the required role to access this</p>
>>>>>>> 02c748d (Initial commit)
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}