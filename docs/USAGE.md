# FakeREST Client

# To Run code *locally*: 

git clone https://github.com/wilsonhj/fakerest-test.git
cd fakerest-test
npm install
npx ts-node src/index.ts --endpoint=http://test.brightsign.io:3000 

# To Run code *globally*:

npm install -g fakerest-client


## Using the Global CLI (After Building and Linking):**

npm run build
npm link

# Basic query

fakerest-client | jq '.'

# additional opts 

fakerest-client --raw | jq '.'
fakerest-client --debug | jq '.'

# Get average age by city

fakerest-client | jq '.averageAgePerCity'

# Get most social users

fakerest-client | jq '.userWithMostFriendsPerCity'

# Get average friends per city

fakerest-client | jq '.averageFriendsPerCity'

# Get most common first name

fakerest-client | jq '.mostCommonFirstName'





## Testing

# run all unit tests
npm test

# run specific test
npm test -- test/dataProcessor.test.ts