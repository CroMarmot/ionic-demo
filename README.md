```
yarn
ionic cordova run android --device
```

should install

`javasdk 1.8.*`

`android studio`

---

坑:

1. 调用相机 的官方代码没有`.show()`。解决方案 增加调用
2. 调用了相机但是 实际效果屏幕有遮挡，用户看起来看不到相机调用。解决方案：`global.scss`+动态添加`cameraView`类
3. 扫描结果返回给`this.text`，页面看不到效果。解决方案 用`NgZone`
