(function() {
  // Lấy tên cửa hàng hiện tại từ domain
  const shop = window.Shopify && Shopify.shop;

  // Endpoint của bạn để lấy cấu hình từ Firestore hoặc DB
  // const configEndpoint = `https://your-domain.com/api/config?shop=${shop}`;

  // Hàm hiển thị popup
  function showPopup(message, position = 'bottom-left') {
    const popup = document.createElement('div');
    popup.innerText = message;

    popup.style.position = 'fixed';
    popup.style.background = '#333';
    popup.style.color = '#fff';
    popup.style.padding = '10px 14px';
    popup.style.borderRadius = '6px';
    popup.style.zIndex = 9999;
    popup.style.fontFamily = 'sans-serif';
    popup.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    popup.style.transition = 'opacity 0.3s ease';
    popup.style.opacity = '0';

    // Xác định vị trí
    if (position === 'bottom-left') {
      popup.style.bottom = '20px';
      popup.style.left = '20px';
    } else if (position === 'bottom-right') {
      popup.style.bottom = '20px';
      popup.style.right = '20px';
    } else if (position === 'top-right') {
      popup.style.top = '20px';
      popup.style.right = '20px';
    } else if (position === 'top-left') {
      popup.style.top = '20px';
      popup.style.left = '20px';
    }

    document.body.appendChild(popup);
    requestAnimationFrame(() => (popup.style.opacity = '1'));

    setTimeout(() => {
      popup.style.opacity = '0';
      setTimeout(() => popup.remove(), 500);
    }, 5000);
  }
  showPopup('hello', 'bottom-left');
  // Kết nối đến WebSocket server của bạn
  // function connectWebSocket(config) {
  //   const socket = new WebSocket(`wss://your-domain.com/ws?shop=${shop}`);
  //
  //   socket.onmessage = function(event) {
  //     const data = JSON.parse(event.data);
  //     if (data.type === 'order_created') {
  //       showPopup(data.message, config.position);
  //     }
  //   };
  //
  //   socket.onerror = function() {
  //     console.warn('[Notification] WebSocket error.');
  //   };
  //
  //   socket.onclose = function() {
  //     console.warn('[Notification] Socket closed. Retrying in 5s...');
  //     setTimeout(() => connectWebSocket(config), 5000);
  //   };
  // }

  // // Bắt đầu: fetch config rồi kết nối socket
  // fetch(configEndpoint)
  //   .then(res => res.json())
  //   .then(config => {
  //     if (config.enabled) {
  //       connectWebSocket(config);
  //     }
  //   })
  //   .catch(err => console.error('[Notification] Lỗi khi tải config:', err));
})();
