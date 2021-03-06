package umm3601.wordRiver;

import static com.mongodb.client.model.Filters.eq;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.collect.ImmutableMap;
import com.mockrunner.mock.web.MockHttpServletRequest;
import com.mockrunner.mock.web.MockHttpServletResponse;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;
import io.javalin.http.util.ContextUtil;
import io.javalin.plugin.json.JavalinJson;

public class WordRiverControllerSpec {

  MockHttpServletRequest mockReq = new MockHttpServletRequest();
  MockHttpServletResponse mockRes = new MockHttpServletResponse();

  private WordRiverController wordRiverController;

  private ObjectId batmanId;

  static MongoClient mongoClient;
  static MongoDatabase db;

  static ObjectMapper jsonMapper = new ObjectMapper();

@BeforeAll
public static void setupAll() {
  String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

  mongoClient = MongoClients.create(
    MongoClientSettings.builder()
    .applyToClusterSettings(builder ->
    builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
    .build());

    db = mongoClient.getDatabase("test");
}

@BeforeEach
public void setupEach() throws IOException {
  // Reset out mock request and response objects
  mockReq.resetAll();
  mockRes.resetAll();

  //Setup database
  MongoCollection<Document> ctxDocuments = db.getCollection("packs");
  ctxDocuments.drop();
  List<Document> testPacks = new ArrayList<>();
  testPacks.add(
    new Document()
      .append("name", "iron man")
      .append("icon", "iron.png")
      .append("enabled", "true")
      .append("wordlist", Arrays.asList(new Document().append("name", "iron man").append("enabled", true)
      .append("nouns", Arrays.asList(new Document("word", "suit").append("forms", Arrays.asList( "suit", "suits"))))
      .append("verbs", Arrays.asList(new Document("word", "fight").append("forms", Arrays.asList("fight", "fights"))))
      .append("adjectives", Arrays.asList(new Document("word", "big").append("forms", Arrays.asList("big", "biggish"))))
      .append("misc", Arrays.asList(new Document("word", "the").append("forms", Arrays.asList("the")))) )
      ));

    testPacks.add(
      new Document()
      .append("name", "captain america")
      .append("icon", "cap.png")
      .append("enabled", "false")
      .append("wordlist", Arrays.asList(new Document().append("name", "iron man").append("enabled", true)
      .append("nouns", Arrays.asList(new Document("word", "suit").append("forms", Arrays.asList("suit", "suits"))))
      .append("verbs", Arrays.asList(new Document("word", "fight").append("forms", Arrays.asList("fight", "fights"))))
      .append("adjectives", Arrays.asList(new Document("word", "big").append("forms", Arrays.asList( "big","biggish"))))
      .append("misc", Arrays.asList(new Document("word", "the").append("forms", Arrays.asList("the")))) )
      ));

  batmanId = new ObjectId();
  Document batman =
    new Document()
      .append("_id", batmanId)
      .append("name","batman")
      .append("icon", "batman.png")
      .append("enabled", "true")
      .append("wordlist", Arrays.asList( new Document().append("name", "iron man").append("enabled", true)
      .append("nouns", Arrays.asList(new Document("word", "suit").append("forms", Arrays.asList("suits"))))
      .append("verbs", Arrays.asList(new Document("word", "fight").append("forms", Arrays.asList("fights"))))
      .append("adjectives", Arrays.asList(new Document("word", "big").append("forms", Arrays.asList("biggish"))))
      .append("misc", Arrays.asList(new Document("word", "the").append("forms", Arrays.asList("the"))))
      ));

  ctxDocuments.insertMany(testPacks);
  ctxDocuments.insertOne(batman);

  wordRiverController = new WordRiverController(db);
}

@AfterAll
public static void teardown() {
  db.drop();
  mongoClient.close();
}

@Test
public void GetAllPacks() throws IOException {
  //Create fake Javalin context
  Context ctx = ContextUtil.init(mockReq,mockRes, "api/packs");
  wordRiverController.getPacks(ctx);

  assertEquals(200, mockRes.getStatus());

  String result = ctx.resultString();
  assertEquals(db.getCollection("packs").countDocuments(), JavalinJson.fromJson(result, ContextPack[].class).length);
}

@Test
public void AddContextPack() throws IOException {

  String testNewContextPack = "{"
      + "\"schema\": \"Test schema\","
      + "\"name\": \"Test Context Pack\","
      + "\"icon\": \"image.png\","
      + "\"enabled\": true,"
      + "\"wordlist\": []"
      + "}";


  mockReq.setBodyContent(testNewContextPack);
  mockReq.setMethod("POST");

  Context ctx = ContextUtil.init(mockReq, mockRes, "api/packs");
  wordRiverController.addNewContextPack(ctx);

  assertEquals(201, mockRes.getStatus());

  String result = ctx.resultString();
  String id = jsonMapper.readValue(result, ObjectNode.class).get("id").asText();
  assertNotEquals("", id);
  System.out.println(id);

  assertEquals(1,db.getCollection("packs").countDocuments(eq("_id", new ObjectId(id))));

  //Verify the context pack was added to the database with the correct ID
  Document addedContextPack = db.getCollection("packs").find(eq("_id", new ObjectId(id))).first();
  assertNotNull(addedContextPack);
  assertEquals("Test Context Pack", addedContextPack.getString("name"));
  assertEquals("image.png", addedContextPack.getString("icon"));
  assertEquals(true, addedContextPack.getBoolean("enabled"));
  assertNotNull(addedContextPack.get("wordlist"));
}

@Test
public void AddNewWordList() throws IOException {

  String testNewWordList = "{"
    + "\"name\": \"Test Wordlist\","
    + "\"enabled\": true,"
    + "\"nouns\": [],"
    + "\"verbs\": [],"
    + "\"adjectives\": [],"
    + "\"misc\": []"
    + "}";


    String testID = batmanId.toHexString();
    mockReq.setBodyContent(testNewWordList);
    mockReq.setMethod("POST");

    ObjectId theId = batmanId;

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/packs/:id", ImmutableMap.of("id", testID));
    wordRiverController.addNewWordList(ctx);

    assertEquals(201, mockRes.getStatus());
    Document ContextPack = db.getCollection("packs").find(Filters.eq("_id", theId)).first();

    @SuppressWarnings("unchecked")
    ArrayList<WordList> cpWordLists = (ArrayList<WordList>) ContextPack.get("wordlist");
    String theContextPackWordLists = cpWordLists.toString();


   assertTrue(theContextPackWordLists.contains("Document{{name=Test Wordlist, enabled=true, nouns=[], verbs=[], adjectives=[], misc=[]}}"));
}

@Test
public void AddNewWordNoun() throws IOException {

  String testNewWord = "{"
    + "\"word\": \"Test Word\","
    + "\"forms\": [\"test\"]"
    + "}";



    String testID = batmanId.toHexString();
    mockReq.setBodyContent(testNewWord.toString());
    mockReq.setMethod("POST");


    Context ctx = ContextUtil.init(mockReq, mockRes, "api/packs/:id/:name/:type", ImmutableMap.of("id", testID, "name", "iron man", "type", "nouns"));
    wordRiverController.addNewWord(ctx);

    assertEquals(201, mockRes.getStatus());

    Document ContextPack = db.getCollection("packs").find(Filters.eq("_id", batmanId)).first();

    @SuppressWarnings("unchecked")
    ArrayList<WordList> cpWordLists = (ArrayList<WordList>)ContextPack.get("wordlist");
    String theContextPackWordLists = cpWordLists.toString();


   assertTrue(theContextPackWordLists.contains("Document{{word=Test Word, forms=[test]}}]"));
}

@Test
public void AddNewWordAdjective() throws IOException {

  String testNewWord = "{"
    + "\"word\": \"Test Word\","
    + "\"forms\": [\"test\"]"
    + "}";



    String testID = batmanId.toHexString();
    mockReq.setBodyContent(testNewWord.toString());
    mockReq.setMethod("POST");


    Context ctx = ContextUtil.init(mockReq, mockRes, "api/packs/:id/:name/:type", ImmutableMap.of("id", testID, "name", "iron man", "type", "adjectives"));
    wordRiverController.addNewWord(ctx);

    assertEquals(201, mockRes.getStatus());

    Document ContextPack = db.getCollection("packs").find(Filters.eq("_id", batmanId)).first();

    @SuppressWarnings("unchecked")
    ArrayList<WordList> cpWordLists = (ArrayList<WordList>) ContextPack.get("wordlist");
    String theContextPackWordLists = cpWordLists.toString();

   assertTrue(theContextPackWordLists.contains("Document{{word=Test Word, forms=[test]}}]"));
}

@Test
public void AddNewWordVerb() throws IOException {

  String testNewWordList = "{"
    + "\"word\": \"run\","
    + "\"forms\": [\"runs\"]"
    + "}";

    String testID = batmanId.toHexString();
    mockReq.setBodyContent(testNewWordList);
    mockReq.setMethod("POST");


    Context ctx = ContextUtil.init(mockReq, mockRes, "api/packs/:id/:name/:type", ImmutableMap.of("id", testID, "name", "iron man", "type", "verbs"));
    wordRiverController.addNewWord(ctx);

    assertEquals(201, mockRes.getStatus());

    Document ContextPack = db.getCollection("packs").find(Filters.eq("_id", batmanId)).first();

    @SuppressWarnings("unchecked")
    ArrayList<WordList> cpWordLists = (ArrayList<WordList>) ContextPack.get("wordlist");
    String theContextPackWordLists = cpWordLists.toString();


   assertTrue(theContextPackWordLists.contains("Document{{word=run, forms=[runs]}}]"));
}

@Test
public void AddNewWordMisc() throws IOException {

  String testNewWordList = "{"
    + "\"word\": \"c3po\","
    + "\"forms\": [\"c3po\"]"
    + "}";

    String testID = batmanId.toHexString();
    mockReq.setBodyContent(testNewWordList);
    mockReq.setMethod("POST");


    Context ctx = ContextUtil.init(mockReq, mockRes, "api/packs/:id/:name/:type", ImmutableMap.of("id", testID, "name", "iron man", "type", "misc"));
    wordRiverController.addNewWord(ctx);

    assertEquals(201, mockRes.getStatus());

    Document ContextPack = db.getCollection("packs").find(Filters.eq("_id", batmanId)).first();

    @SuppressWarnings("unchecked")
    ArrayList<WordList> cpWordLists = (ArrayList<WordList>) ContextPack.get("wordlist");
    String theContextPackWordLists = cpWordLists.toString();


   assertTrue(theContextPackWordLists.contains("Document{{word=c3po, forms=[c3po]}}]"));

}

@Test
public void AddInvalidName() throws IOException {

  String testNewContextPack = "{"
      + "\"schema\": \"Test schema\","
      + "\"name\": \"\","
      + "\"icon\": \"image.png\","
      + "\"enabled\": true,"
      + "\"wordlist\": []"
      + "}";

 mockReq.setBodyContent(testNewContextPack);
 mockReq.setMethod("POST");
 Context ctx = ContextUtil.init(mockReq, mockRes, "api/packs");

 assertThrows(BadRequestResponse.class, () -> {
   wordRiverController.addNewContextPack(ctx);
 });
}

@Test
public void AddNullName() throws IOException {

  String testNewContextPack = "{"
  + "\"schema\": \"Test schema\","
  + "\"icon\": \"image.png\","
  + "\"enabled\": true,"
  + "\"wordlist\": []"
  + "}";

 mockReq.setBodyContent(testNewContextPack);
 mockReq.setMethod("POST");
 Context ctx = ContextUtil.init(mockReq,mockRes,"api/packs");

 assertThrows(BadRequestResponse.class, () -> {
    wordRiverController.addNewContextPack(ctx);
  });
}

@Test
public void AddNullIcon() throws IOException {

  String testNewContextPack = "{"
  + "\"schema\": \"Test schema\","
  + "\"name\": \"Test Context Pack\","
  + "\"enabled\": true,"
  + "\"wordlist\": []"
  + "}";

  mockReq.setBodyContent(testNewContextPack);
  mockReq.setMethod("POST");

  Context ctx = ContextUtil.init(mockReq,mockRes,"api/packs");

  assertThrows(BadRequestResponse.class,() -> {
  wordRiverController.addNewContextPack(ctx);
 });
}

@Test
public void secureSchema() {
  ContextPack schema = new ContextPack();
  assertEquals("https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json",
  schema.schema);
  }

@Test
public void GetContextPackWithExistentId() throws IOException {

  String testID = batmanId.toHexString();

  Context ctx = ContextUtil.init(mockReq, mockRes, "api/packs/:id", ImmutableMap.of("id", testID));
  wordRiverController.getPack(ctx);

  assertEquals(200, mockRes.getStatus());

  String result = ctx.resultString();
  ContextPack resultPack = JavalinJson.fromJson(result, ContextPack.class);

  assertEquals(resultPack._id, batmanId.toHexString());
  assertEquals(resultPack.name, "batman");
}

@Test
  public void GetContextPackWithBadId() throws IOException {

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/packs/:id", ImmutableMap.of("id", "bad"));

    assertThrows(BadRequestResponse.class, () -> {
      wordRiverController.getPack(ctx);
    });
  }

@Test
  public void GetContextPackWithNonexistentId() throws IOException {

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/packs/:id", ImmutableMap.of("id", "58af3a600343927e48e87335"));

    assertThrows(NotFoundResponse.class, () -> {
      wordRiverController.getPack(ctx);
    });
  }

}
