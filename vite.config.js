import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
console.log(__dirname);

const path = require('path') 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 别名配置
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: { 
    hmr: true,  // 开启热更新              
    host: '0.0.0.0',    //解决无法将网络暴露
    proxy:{
      '/vite':{
        target:'http://10.131.21.183:3001/',
        // target:'http://192.168.2.20:5001/',
        changeOrigin:true, 
        pathRewrite: {  
          '^/vite': '/'   //测试nest 本身的接口地址没有 '/vite' 这种通用前缀，所以要rewrite，如果本身有则去掉  
        }
      }
    }
  } ,
  // build
  build: {
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [],
      // https://rollupjs.org/guide/en/#big-list-of-options
    },
  },
})
