const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = graphql;
const meetingRoomData = require("../MOCK_DATA.json");

const UserType = require("./TypeDefs/UserType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllMeetingRooms: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return meetingRoomData;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    bookMeetingRoom: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        floor: { type: GraphQLString },
        building: { type: GraphQLString }
      },
      resolve(parent, args) {
        meetingRoomData.push({
          id: meetingRoomData.length + 1,
          name: args.name,
          floor: args.floor,
          building: args.building
        });
        return args;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery , mutation: Mutation});
