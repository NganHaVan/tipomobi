package com.tampere.tipomobi;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import com.facebook.react.ReactActivity;

        import com.facebook.react.ReactActivityDelegate;
        import com.facebook.react.ReactRootView;
        import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
        import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {

    public void onResume() {
        super.onResume();
        NotificationManager nMgr = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel notificationChannel = new NotificationChannel("channelID", "channelName", importance);
            notificationChannel.enableLights(true);
            notificationChannel.enableVibration(true);
            notificationChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});
            nMgr.createNotificationChannel(notificationChannel);
        }
        nMgr.cancelAll();
    }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);
      super.onCreate(null);
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component. asdsd
   */
  @Override
  protected String getMainComponentName() {
    return "TipotieNavi";
  }
}
