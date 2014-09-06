package com.piglovesyou.soy.function;

import com.google.inject.AbstractModule;
import com.google.inject.multibindings.Multibinder;
import com.google.template.soy.shared.restricted.SoyFunction;

/**
 */
public class SoyFunctionsModule extends AbstractModule {

  @Override
  protected void configure() {
    Multibinder<SoyFunction> soyFunctionsSetBinder = Multibinder.newSetBinder(binder(), SoyFunction.class);
    soyFunctionsSetBinder.addBinding().to(ToJsonFunction.class);
  }
}
