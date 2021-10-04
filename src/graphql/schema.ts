
type List {
    id: String!
    title: String!
    items(title: String): [Item]
}

type Item {
    id: String!
    title: String!
    description: String!
}

type Query {
    list: [Item]
}

type Mutation {
    createItem(title: String, description: String): Item
    updateItem(id: String!, title: String, description: String): Item
    deleteItem(id: String!): String
}