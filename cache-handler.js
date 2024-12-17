const fs = require('fs');
const path = require('path');

// Simple filesystem-based cache handler
module.exports = class CacheHandler {
  constructor(options) {
    this.options = options;
    this.cacheDirectory = path.join(process.cwd(), '.next/cache');
    
    // Ensure cache directory exists
    if (!fs.existsSync(this.cacheDirectory)) {
      fs.mkdirSync(this.cacheDirectory, { recursive: true });
    }
  }

  async get(key) {
    try {
      const filePath = path.join(this.cacheDirectory, key);
      if (!fs.existsSync(filePath)) return null;
      
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.warn(`Cache read error for key ${key}:`, error);
      return null;
    }
  }

  async set(key, data) {
    try {
      const filePath = path.join(this.cacheDirectory, key);
      fs.writeFileSync(filePath, JSON.stringify(data));
    } catch (error) {
      console.warn(`Cache write error for key ${key}:`, error);
    }
  }
};