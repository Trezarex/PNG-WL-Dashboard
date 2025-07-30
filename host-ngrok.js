import ngrok from 'ngrok';

const PORT = 8000;

console.log('🚀 Creating public tunnel for your dashboard...');
console.log(`📁 Local server should be running on port ${PORT}`);
console.log('💡 Make sure to run: npm run host:build');

try {
  const url = await ngrok.connect({
    addr: PORT,
    authtoken: null // Use free tier
  });
  
  console.log('\n✅ SUCCESS! Your dashboard is now public!');
  console.log(`🌐 Public URL: ${url}`);
  console.log(`📱 Anyone can now access your dashboard at: ${url}`);
  console.log('\n📋 Share this URL with anyone, anywhere!');
  console.log('\n⚠️  Security Note: This is a public URL - anyone can access it');
  console.log('🛑 Press Ctrl+C to stop the tunnel');
  
  // Keep the process running
  process.on('SIGINT', async () => {
    console.log('\n🛑 Stopping ngrok tunnel...');
    await ngrok.kill();
    console.log('✅ Tunnel stopped');
    process.exit(0);
  });
  
} catch (error) {
  console.error('❌ Error creating tunnel:', error.message);
  console.log('\n💡 Make sure:');
  console.log('   1. Your local server is running (npm run host:build)');
  console.log('   2. Port 8000 is not blocked by firewall');
  console.log('   3. You have internet connection');
} 