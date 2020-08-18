package com.medicine;

import com.reactnativenavigation.NavigationActivity;
import android.content.Intent;

public class MainActivity extends NavigationActivity {
    @Override
    public void onNewIntent(Intent intent) {
        setIntent(intent);
        super.onNewIntent(intent);
    }
}
