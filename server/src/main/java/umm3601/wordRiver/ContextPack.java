package umm3601.wordRiver;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class ContextPack {

  @ObjectId @Id
  public String _id;

  public String name;
  public String icon;
  public boolean enabled;
  public WordList[] wordLists;
}
