// index.js
Page({
  data: {
    services: [
      { name: '到店取餐', icon: 'https://semhaq.github.io/community_service/images/rice-bowl.png' },
      { name: '取外卖', icon: 'https://semhaq.github.io/community_service/images/electric-scooter.png' },
      { name: '宠物洗护', icon: 'https://semhaq.github.io/community_service/images/paw-print.png' },
      { name: '宠物喂养', icon: 'https://semhaq.github.io/community_service/images/pet-house.png' },
      { name: '遛狗服务', icon: 'https://semhaq.github.io/community_service/images/dog.png' },
      { name: '维修服务', icon: 'https://semhaq.github.io/community_service/images/wrench.png' },
      { name: '衣物干洗', icon: 'https://semhaq.github.io/community_service/images/washing-machine.png' },
      { name: '送水上门', icon: 'https://semhaq.github.io/community_service/images/water-drop.png' },
      { name: '扔垃圾', icon: 'https://semhaq.github.io/community_service/images/trash-bag.png' },
      { name: '团购专区', icon: 'https://semhaq.github.io/community_service/images/shopping-bag.png' }
    ]
  },

  onLoad() {
    // 页面加载时的初始化
  },

  // 显示选项弹窗
  showOptions() {
    wx.showActionSheet({
      itemList: ['跳转小程序', '打开网页', '联系客服', '取消'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.navigateToMiniProgram();
            break;
          case 1:
            this.openWebPage();
            break;
          case 2:
            this.contactCustomerService();
            break;
          case 3:
            // 取消
            break;
        }
      },
      fail: (res) => {
        console.error('showActionSheet fail:', res);
      }
    });
  },

  // 跳转到小程序
  navigateToMiniProgram() {
    wx.navigateToMiniProgram({
      appId: 'wx1234567890abcdef', // 替换为实际的小程序appid
      path: 'pages/index/index',
      success: (res) => {
        console.log('跳转成功', res);
      },
      fail: (res) => {
        console.error('跳转失败', res);
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        });
      }
    });
  },

  // 打开网页
  openWebPage() {
    wx.navigateTo({
      url: '/pages/webview/webview?url=https://example.com',
      success: (res) => {
        console.log('打开网页成功', res);
      },
      fail: (res) => {
        console.error('打开网页失败', res);
        wx.showToast({
          title: '打开失败',
          icon: 'none'
        });
      }
    });
  },

  // 联系客服
  contactCustomerService() {
    wx.makePhoneCall({
      phoneNumber: '400-123-4567', // 替换为实际的客服电话
      success: (res) => {
        console.log('拨打电话成功', res);
      },
      fail: (res) => {
        console.error('拨打电话失败', res);
        wx.showToast({
          title: '拨号失败',
          icon: 'none'
        });
      }
    });
  },

  // 跳转到互帮互助页面
  navigateToHelp() {
    wx.navigateTo({
      url: '/pages/help/help',
      success: (res) => {
        console.log('跳转成功', res);
      },
      fail: (res) => {
        console.error('跳转失败', res);
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        });
      }
    });
  },

  // 跳转到帮取快递页面
  navigateToDelivery() {
    wx.navigateTo({
      url: '/pages/delivery/delivery',
      success: (res) => {
        console.log('跳转成功', res);
      },
      fail: (res) => {
        console.error('跳转失败', res);
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        });
      }
    });
  },

  // 服务图标点击事件
  serviceClick(e) {
    const service = e.currentTarget.dataset.service;
    console.log('点击服务:', service);

    wx.showToast({
      title: `点击了 ${service}`,
      icon: 'none',
      duration: 1500
    });

    // 根据服务名称跳转到对应页面
    const serviceRoutes = {
      '到店取餐': '/pages/dinein/dinein',
      '取外卖': '/pages/takeout/takeout',
      '宠物洗护': '/pages/petcare/petcare',
      '宠物喂养': '/pages/petfeeding/petfeeding',
      '遛狗服务': '/pages/dogwalking/dogwalking',
      '维修服务': '/pages/repair/repair',
      '衣物干洗': '/pages/dryclean/dryclean',
      '送水上门': '/pages/waterdelivery/waterdelivery',
      '扔垃圾': '/pages/garbage/garbage',
      '团购专区': '/pages/groupbuy/groupbuy'
    };

    const route = serviceRoutes[service];
    if (route) {
      wx.navigateTo({
        url: route,
        success: (res) => {
          console.log('跳转成功', res);
        },
        fail: (res) => {
          console.error('跳转失败', res);
          wx.showToast({
            title: '页面开发中...',
            icon: 'none'
          });
        }
      });
    }
  },

  // 购买卡片
  purchaseCard(e) {
    const type = e.currentTarget.dataset.type;
    const cardInfo = {
      feeding: { name: '喂养卡', price: '15元/次' },
      dryclean: { name: '干洗卡', price: '25元/次' }
    };

    const card = cardInfo[type];
    if (card) {
      wx.showModal({
        title: '确认购买',
        content: `${card.name} - ${card.price}`,
        confirmText: '立即购买',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            this.processPayment(type, card);
          }
        },
        fail: (res) => {
          console.error('showModal fail:', res);
        }
      });
    }
  },

  // 处理支付
  processPayment(type, card) {
    console.log('开始支付:', type, card);

    // 模拟支付流程
    wx.showLoading({
      title: '处理中...',
      mask: true
    });

    setTimeout(() => {
      wx.hideLoading();

      wx.showToast({
        title: '购买成功！',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            // 支付成功后可以跳转到订单页面
            wx.navigateTo({
              url: '/pages/orders/orders',
              fail: (res) => {
                console.error('跳转订单页失败:', res);
              }
            });
          }, 2000);
        }
      });
    }, 1500);
  },

  // 页面分享
  onShareAppMessage() {
    return {
      title: '社区万事通 解忧分分钟',
      path: '/pages/index/index',
      imageUrl: '/images/share-image.png' // 替换为实际的分享图片
    };
  },

  // 页面显示
  onShow() {
    console.log('页面显示');
  },

  // 页面隐藏
  onHide() {
    console.log('页面隐藏');
  },

  // 页面卸载
  onUnload() {
    console.log('页面卸载');
  },

  // 复制GitHub链接到剪贴板
  openGitHub() {
    const githubUrl = 'https://github.com/SEMHAQ/community_service';
    console.log('开始复制GitHub链接:', githubUrl); // 调试日志

    wx.setClipboardData({
      data: githubUrl,
      success: (res) => {
        console.log('复制成功', res);
        // 尝试使用 showModal 替代 showToast，确保提示显示
        wx.showModal({
          title: '链接已复制',
          content: 'GitHub链接已成功复制',
          showCancel: false,
          confirmText: '知道了',
          success: (modalRes) => {
            console.log('提示框显示成功', modalRes);
          },
          fail: (modalRes) => {
            console.error('提示框显示失败', modalRes);
            // 如果 showModal 也失败，尝试 showToast
            wx.showToast({
              title: '链接已复制',
              icon: 'success',
              duration: 2000
            });
          }
        });
      },
      fail: (res) => {
        console.error('复制失败', res);
        wx.showModal({
          title: '复制失败',
          content: '无法复制链接，请重试',
          showCancel: false,
          confirmText: '知道了'
        });
      }
    });
  }
});
