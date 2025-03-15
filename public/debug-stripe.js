// Debug script for checking Stripe connection status

document.addEventListener('DOMContentLoaded', () => {
  const debugStripe = async () => {
    try {
      console.log('Stripe connection test starting...');
      
      // Check if we can reach the ping endpoint
      const pingResponse = await fetch('/ping', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const pingData = await pingResponse.json();
      console.log('Ping response:', pingData);
      
      // Create a debug div
      const debugDiv = document.createElement('div');
      debugDiv.id = 'stripe-debug';
      debugDiv.style.position = 'fixed';
      debugDiv.style.bottom = '20px';
      debugDiv.style.right = '20px';
      debugDiv.style.padding = '15px';
      debugDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      debugDiv.style.borderRadius = '8px';
      debugDiv.style.color = '#fff';
      debugDiv.style.fontSize = '14px';
      debugDiv.style.fontFamily = 'monospace';
      debugDiv.style.zIndex = '1000';
      
      debugDiv.innerHTML = `
        <div style="margin-bottom: 10px;">
          <strong>Server Connection:</strong> ${pingResponse.ok ? '✅ Success' : '❌ Failed'}
        </div>
        <div style="margin-bottom: 10px;">
          <strong>Response:</strong> ${JSON.stringify(pingData)}
        </div>
        <div>
          <button id="test-payment" style="background: #6d28d9; border: none; padding: 5px 10px; border-radius: 4px; color: white; cursor: pointer;">
            Test Payment Intent
          </button>
        </div>
      `;
      
      document.body.appendChild(debugDiv);
      
      // Add event listener for test payment button
      document.getElementById('test-payment').addEventListener('click', async () => {
        try {
          console.log('Testing create-payment-intent endpoint...');
          
          const paymentTestResponse = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              amount: 1000, // 10 INR
              programId: 'test-program'
            })
          });
          
          console.log('Payment intent status:', paymentTestResponse.status);
          console.log('Payment intent headers:', Array.from(paymentTestResponse.headers.entries()));
          
          const paymentData = await paymentTestResponse.json();
          console.log('Payment intent response:', paymentData);
          
          const resultDiv = document.createElement('div');
          resultDiv.style.marginTop = '10px';
          resultDiv.innerHTML = `
            <div style="margin-bottom: 10px;">
              <strong>Payment Status:</strong> ${paymentTestResponse.ok ? '✅ Success' : '❌ Failed'}
            </div>
            <div>
              <strong>Response:</strong> <pre style="white-space: pre-wrap;">${JSON.stringify(paymentData, null, 2)}</pre>
            </div>
          `;
          
          debugDiv.appendChild(resultDiv);
        } catch (error) {
          console.error('Error testing payment intent:', error);
          
          const errorDiv = document.createElement('div');
          errorDiv.style.marginTop = '10px';
          errorDiv.style.color = '#ef4444';
          errorDiv.innerHTML = `
            <div>
              <strong>Error:</strong> ${error.message}
            </div>
          `;
          
          debugDiv.appendChild(errorDiv);
        }
      });
      
    } catch (error) {
      console.error('Stripe debug error:', error);
    }
  };
  
  debugStripe();
}); 