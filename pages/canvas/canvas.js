const util = require('../../utils/util');
const bgUrl = "https://cdn.chacha.top/mini_pro/share_bg.png";

Page({

    data: {
        imgUrl: '',
        shareDate: {
        	name: 'Damon',
        	title: '标题知识产权专项资金知识产权专项资金项资金项资金 ',
        	status: '有效',
        	area: '四川省成都市'
        }
    },

    onLoad: function (options) {
    	let _that = this;
    	_that.draw();
    },

    draw() {
    	let _that = this;

    	wx.getImageInfo({
    		src: bgUrl,
    		success(res) {
    			let {shareDate} = _that.data;
    			let titleHeight;
    			let ctx = wx.createCanvasContext('myCanvas');

    			ctx.drawImage(res.path, 0, 0, 750, 788);
    			
    			// 用户名
    			util.wrapText({
    				ctx,
				  	text:shareDate.name,
				  	x: 120,
				  	y: 75,
				  	w: 170,
				  	fontStyle: {
				    	lineHeight: 83,
				    	textAlign: 'left',
				    	textBaseline: 'top',
				    	font: 'normal 24px arial',
				    	fillStyle: '#333'
				  	}
    			})

    			// 标题
    			let title = shareDate.title.length < 80 ? shareDate.title : shareDate.title.substring(0,80)+'...'
    			titleHeight = util.wrapText({
    				ctx,
				  	text: title,
				  	x: 42,
				  	y: 195,
				  	w: 645,
				  	fontStyle: {
				    	lineHeight: 58,
				    	textAlign: 'left',
				    	textBaseline: 'top',
				    	font: 'normal 40px arial',
				    	fillStyle: '#535353'
				  	}
    			});
    			
    			let top1 = titleHeight + 120; // 地区在y轴上的值
    			let top2 = top1 + 45; // 状态在y轴上的值

    			// 地区
    			ctx.font = 'normal normal 28px arial';
                ctx.fillStyle = '#b4a296';
                ctx.fillText('适用于 ', 42, top1);

                let w1 = ctx.measureText('适用于 ').width;
                ctx.font = 'normal normal 28px arial';
                ctx.fillStyle = '#ff7010';
                ctx.fillText(shareDate.area, 42+w1, top1);

                let w2 = ctx.measureText(shareDate.area).width;
                ctx.font = 'normal normal 28px arial';
                ctx.fillStyle = '#b4a296';
                ctx.fillText(' 的机构', 42+w1+w2, top1);

                // 政策状态
                ctx.font = 'normal normal 28px arial';
                ctx.fillStyle = '#b4a296';
                ctx.fillText('政策状态：', 42, top2);

                let w3 = ctx.measureText('政策状态：').width;
                ctx.font = 'normal normal 28px arial';
                ctx.fillStyle = '#ff7010';
                ctx.fillText(shareDate.status, 42+w3, top2);


                // 长按小程序码查看详情
                ctx.font = 'normal normal 24px arial';
                ctx.fillStyle = '#535353';
                ctx.fillText('长按小程序码查看详情', 35, 670);

                // 头像
                /*wx.downloadFile({
                	url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543030619359&di=d26dfbfe8898517f3fc0d14dd7fb1437&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3Df6277da51a4c510fae91ea1e5569091b%2F4b90f603738da97748712546b051f8198618e305.jpg',
                	success(res) {

                		let width = 63;
                		let height = 63;
                		let x = 40;
                		let y = 55;

                		ctx.beginPath();
                		ctx.arc(width/2+x, height/2+y, width/2, 0, Math.PI*2);
                		ctx.clip();
                		ctx.drawImage(res.tempFilePath, x, y, width, height);


                		ctx.draw(true, (res)=> {
		    				wx.canvasToTempFilePath({
		    					canvasId: 'myCanvas',
		    					success(res) {

		    						_that.setData({
		    							imgUrl: res.tempFilePath
		    						})
		    					}
		    				}, _that)
		    			})
                	}
                })*/

                ctx.draw(true, (res)=> {
		    				wx.canvasToTempFilePath({
		    					canvasId: 'myCanvas',
		    					success(res) {

		    						_that.setData({
		    							imgUrl: res.tempFilePath
		    						})
		    					}
		    				}, _that)
		    			})
    		}
    	})
    },

    save() {
    	let _that = this;
    	wx.showLoading({
            mask: true
        })
    	wx.canvasToTempFilePath({
    		x: 0,
    		y: 0,
    		width: 750,
    		height: 788,
    		destWidth: 750,
    		destHeight: 788,
    		canvasId: 'myCanvas',
    		success(res) {
    			
    			wx.saveImageToPhotosAlbum({
    				filePath: res.tempFilePath,
    				success(res) {
    					wx.hideLoading();
    					wx.showModal({
    						title: '提示',
    						showCancel: false,
	                        confirmText: '知道了',
	                        confirmColor: '#0facf3',
	                        content: '已成功为您保存图片到手机相册，请自行前往朋友圈分享。',
	                        success: (res) => {
	                            if (res.confirm) {
	                                console.log('保存成功，隐藏模态框')
	                            }
	                        }
    					})
    				},
    				fail(res) {
    					wx.hideLoading();
    					wx.showModal({
    						title: '保存出错',
    						showCancel: false,
	                        confirmText: '知道了',
	                        confirmColor: '#0facf3',
	                        content: '您拒绝了授权 ，如果您要保存图片，请删除小程序，再重新打开。',
	                        success: (res) => {
	                        	console.log(res)
	                        }
    					})
    				}
    			})
    		}
    	}, _that)
    }
})