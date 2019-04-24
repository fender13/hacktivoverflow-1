# hacktivoverflow

# mini-wp
---
User Table\
firstName: REQUIRED\
lastName: REQUIRED\
username: REQUIRED\
email: REQUIRED\
password: REQUIRED

User Routes No | HTTP | Routes | Header | body | Description | Success | error |
--- | --- | --- | --- | --- | --- | --- | --- |
1 | POST | /register | | firstName, lastName, username, email, password | Manual Registration | Object { _id, firstName, lastName, username, email, password } | Object { message: ... } 500 (Internal Server Error) |
2 | POST | /login | | username, password | Manual Login | 200 (token) | Object { message: ... } 500 (Internal Server Error) |
3 | POST | /google || Google Id_Token | Google Sign In | 200 (token) | Object { message: ... } 500 (Internal Server Error) |
---
Question
Routes No | HTTP | Routes | Header | body | Description | Success | error |
--- | --- | --- | --- | --- | --- | --- | --- |
1 | POST | /questions | token | title, question, tags | Create New Questions | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
2 | GET | /questions | | | Get all questions | All questions in array | Object { message: ... } 500 (Internal Server Error) |
3 | GET | / questions/user | token | | Get all user questions | All user questions in array | Object { message: ... } 500 (Internal Server Error) |
4 | GET | /question/:id | | | Get one questions | Questions data in object | Object { message: ... } 500 (Internal Server Error) |
5 | POST | /questions/add-vote/:id | token | | add voteUp | voteUp add by 1 | Object { message: ... } 500 (Internal Server Error) |
6 | POST | /questions/reduce-vote/:id | token | | add voteDown | voteDown add by 1 | Object { message: ... } 500 (Internal Server Error) |
7 | DELETE | /questions/:id | token | | Delete Questions | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
8 | PUT | /questions/:id | token | title, question, tags | Update Questions | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
---
Answer
Routes No | HTTP | Routes | Header | body | Description | Success | error |
--- | --- | --- | --- | --- | --- | --- | --- |
1 | POST | /answers/:questionId | token | answer | Post New Answer | answer in object |  Object { message: ... } 500 (Internal Server Error) |
2 | POST | /answers/add-vote/:answersId | token | | add voteUp | voteUp add by 1 | Object { message: ... } 500 (Internal Server Error) |
3 | POST | /answers/reduce-vote/:answersId | token | | add voteDown | voteDown add by 2 | Object { message: ... } 500 (Internal Server Error) |
4 | DELETE | /answers/:answerId | token | | Delete Answers | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
5 | GET | /answers/:answerId | token | | Get specific answer for update | res.status(200) | Object { message: ... } 500 (Internal Server Error) |
6 | PUT | /answers/:answerId | token | | update answers | answers | Object { message: ... } 500 (Internal Server Error) |
---
Tag
Routes No | HTTP | Routes | Header | body | Description | Success | error |
--- | --- | --- | --- | --- | --- | --- | --- |
1 | Get | /tags/:tagName | | | Get Tag data by Tag Name | req.status(200) | Object { message: ... } 500 (Internal Server Error) |
2 | POST | /tags/watched | token | TagId | Create and save watched tags | req.status(200) | Object { message: ... } 500 (Internal Server Error) |
3 | POST | /tags/verify | token | TagId | verify if tags are saved | req.status(200) | Object { message: ... } 500 (Internal Server Error) |
4 | POST | /tags/remove-tag/:id | token | TagId | remove watched tags | req.status(200) | Object { message: ... } 500 (Internal Server Error) |
5 | GET | /tags | token | | get all saved watched tags | req.status(200) | Object { message: ... } 500 (Internal Server Error) |