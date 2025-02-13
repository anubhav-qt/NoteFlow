import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone, FaPenNib, FaFileAlt, FaBook, FaUserCircle, FaSearch, FaBars } from "react-icons/fa";
import Input from '../Input';

const HomePage = () => {
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const handleNewMessage = (message, isUser) => {
    setChatMessages(prev => [...prev, { text: message, isUser }]);
    if (!hasStartedChat) setHasStartedChat(true);
  };

  return (
    <div className="relative flex flex-col h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-transparent to-purple-500 opacity-20 z-0" />

      <div className="flex flex-col h-full z-10">
        <AnimatePresence>
          {!hasStartedChat && (
            <motion.div
              className="flex-1 flex flex-col items-center justify-center relative bottom-[10vh]"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-6 left-6 text-white text-3xl cursor-pointer">
                <FaBars />
              </div>
              <div className="absolute top-6 right-6 flex gap-4 text-white text-2xl">
                <FaSearch className="cursor-pointer hover:scale-110 transition-transform" />
                <FaUserCircle className="cursor-pointer hover:scale-110 transition-transform" />
              </div>
              <motion.h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-wide relative z-10 font-monsterrat text-shadow">
                Create <span className="text-blue-400">Beautiful Notes</span>
              </motion.h1>

              <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 relative z-10">
                {[
                  { text: "From audio/video transcripts", icon: <FaMicrophone size={24} /> },
                  { text: "From handwritten notes", icon: <FaPenNib size={24} /> },
                  { text: "From digital texts", icon: <FaFileAlt size={24} /> },
                  { text: "From course material", icon: <FaBook size={24} /> }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center px-6 py-4 bg-white/10 border border-white/20 rounded-xl shadow-lg hover:bg-white/20 transition-transform transform hover:scale-110 cursor-pointer text-center text-gray-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span className="mt-2">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`flex flex-col ${hasStartedChat ? 'h-3/4' : ''}`}>
          {hasStartedChat && (
            <div className="flex-1 overflow-y-auto px-4 py-6 mt-[7vh]">
              <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
                {chatMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isUser
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-700 text-white rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className={`p-4 max-w-3xl w-full z-100 mx-auto ${hasStartedChat ? 'mt-8' : 'mt-[-35vh]'}`}>
            <Input onNewMessage={handleNewMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;