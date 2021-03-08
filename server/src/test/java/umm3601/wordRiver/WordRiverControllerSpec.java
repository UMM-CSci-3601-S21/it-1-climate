package umm3601.wordRiver;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class WordRiverControllerSpec {

  @Test
  public void secureSchema() {

    ContextPack schema = new ContextPack();
    assertEquals("https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json",
    schema.$schema);
  }
}
