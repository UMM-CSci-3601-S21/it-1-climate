package umm3601.wordRiver;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class WordList {

  @ObjectId @Id
  public String _id;

  public String name;
  public boolean enabled;
  public Word[] nouns;
  public Word[] verbs;
  public Word[] adjectives;
  public Word[] misc;
}
