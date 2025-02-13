import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-transparent to-purple-500 opacity-20 animate-pulse z-0" />

      <motion.h1
        className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-wide relative z-10 font-monsterrat text-shadow"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to <span className="text-blue-400">Noteflow</span>
      </motion.h1>

      <motion.p
        className="text-lg text-gray-300 mb-10 max-w-lg text-center relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Revolutionizing note-taking with AI-powered structuring, seamless visualization, and effortless transformation of raw content into beautiful documents.
      </motion.p>

      <motion.p
        className="text-md text-white cursor-pointer mt-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Click anywhere to continue...
      </motion.p>
    </div>
  );
};

export default LandingPage;