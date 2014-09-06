package com.piglovesyou.soy.function;

import static com.google.template.soy.shared.restricted.SoyJavaRuntimeFunctionUtils.toSoyData;

import java.util.List;
import java.util.Set;

import com.google.common.collect.ImmutableSet;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.google.template.soy.data.SoyData;
import com.google.template.soy.data.restricted.IntegerData;
import com.google.template.soy.data.restricted.StringData;
import com.google.template.soy.jssrc.restricted.JsExpr;
import com.google.template.soy.jssrc.restricted.SoyJsSrcFunction;
import com.google.template.soy.tofu.restricted.SoyAbstractTofuFunction;
import com.google.template.soy.tofu.restricted.SoyTofuFunction;

/**
 * From "Defining a Custom Function" in "Closure: The Definitive Guide"
 */
@Singleton
public class ToJsonFunction extends SoyAbstractTofuFunction
    implements SoyJsSrcFunction, SoyTofuFunction {

  @Inject
  ToJsonFunction() {}


  @Override
  public String getName() {
    return "toJson";
  }


  @Override
  public Set<Integer> getValidArgsSizes() {
    return ImmutableSet.of(1);
  }


  @Override
  public JsExpr computeForJsSrc(final List<JsExpr> args) {
    JsExpr stringArg = args.get(0);

    return new JsExpr("JSON.stringify(" + stringArg.getText() + ")", Integer.MAX_VALUE);
  }


  @Override
  public SoyData compute(final List<SoyData> args) {
    // TODO: Leaving
  return toSoyData(0);
  }
}
