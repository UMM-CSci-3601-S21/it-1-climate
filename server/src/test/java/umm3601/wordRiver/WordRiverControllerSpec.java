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
public void secureSchema() {
  ContextPack schema = new ContextPack();
  assertEquals("https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json",
  schema.$schema);
  }
}
