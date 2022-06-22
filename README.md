Coding Challenge

### Goals to achive with this exercise

Given there are no existing spendings
When I fill the description, currency and amount
And I click the "Save" button
Then I see my spending in the list
And the spending is persisted on the server
And the form is emptied

Given that I have not filled the description or the amount
When I click the "Save" button
Then I see an error indicating the missing field

Given there are existing spendings in the list
When I change the selected ordering
Then the list is reorder by the selection

Given there are existing spendings in the list
When I click on a currency filter button (HUF, USD, All)
Then the list is filtered by that selection
And shows only the matching spendings



### Run the Node/Express API

This project is best run using **Node 14.17.x**.

```shell
cd node && npm i
```

Run the node tests:

```shell
cd node && npm test
```

Run the API (http://localhost:5000):

```shell
cd node && npm start
```

### Run the JS Client

This project is best run using **Node 14.17.x**.

Install client dependencies:

```shell
cd web && npm i
```

Run the client tests:

```shell
cd web && npm test
```

Run the client (http://localhost:3000):

```shell
cd web && npm start
```
