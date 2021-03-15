package umm3601.wordRiver;

import static com.mongodb.client.model.Filters.eq;


import java.util.ArrayList;


import com.google.common.collect.ImmutableMap;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;
public class WordRiverController {

  private final JacksonMongoCollection<ContextPack> ctxCollection;
  private final JacksonMongoCollection<WordList> wlCollection;


/**
 * Construct a controller for context packs
 *
 * @param database the database containing context pack data
 */

 public WordRiverController(MongoDatabase database) {
   ctxCollection = JacksonMongoCollection.builder().build(database, "packs", ContextPack.class);
   wlCollection = JacksonMongoCollection.builder().build(database, "lists", WordList.class);
 }


 /**
  * Get a Json response with a list of all context packs
  *
  * @param ctx a Javalin HTTP context
  */

  public void getPacks(Context ctx) {
    ctx.json(ctxCollection.find(new Document()).into(new ArrayList<>()));
  }



 public void addNewContextPack(Context ctx) {
   ContextPack newContextPack = ctx.bodyValidator(ContextPack.class)
    .check(cp -> cp.name !=null && cp.name.length() > 0)
    .check(cp -> cp.icon !=null)
    //.check(cp -> cp.wordlist != null )
    .get();

    ctxCollection.insertOne(newContextPack);
    ctx.status(201);
    ctx.json(ImmutableMap.of("id", newContextPack._id));
 }

 public void getPack(Context ctx) {

  String id = ctx.pathParam("id");
  ContextPack contextPack;

  try {
    contextPack = ctxCollection.find(eq("_id", new ObjectId(id))).first();
  } catch(IllegalArgumentException e) {
    throw new BadRequestResponse("The requested context pack id wasn't a legal Mongo Object ID.");
  }
  if (contextPack == null) {
    throw new NotFoundResponse("The requested context pack was not found");
  } else {
    ctx.json(contextPack);
  }
}

public void addNewWordList(Context ctx) {
  WordList newWordList = ctx.bodyValidator(WordList.class)
    .check(wl -> wl.name !=null && wl.name.length() > 0)
    .get();
  ContextPack contextPack;
  String id = ctx.pathParam("id");
  contextPack = ctxCollection.findOneById(id);
  contextPack.wordlist.add(newWordList);
}


}
