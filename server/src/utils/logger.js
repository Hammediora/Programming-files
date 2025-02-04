// src/utils/logger.js
const logger = (message) => {
    console.log(`[LOG] ${new Date().toISOString()} - ${message}`);
  };
  
export default logger;
  