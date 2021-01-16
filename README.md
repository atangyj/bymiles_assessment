## DESIGN OF ROUTING

### Extensible: 
Without changing components, it is capable of satisfying following routing behaviour when more public or private pages are added.
- Enter a private route in browser (http://domain/private)
- Redirect to Login page (http://domain/login?redirect=/private)
- After login, redirect to private page with content (http://domain/private)

### Declarative:
It is declarative the route is private or public.

```
<Switch>
  <Route path="/public" component= { Public } />
  <RouteWithAuth path="/private" component= {Private} />
</Switch>

```
## UNIT TESTS
- mock api with token response to test login function
- mock api with policy response to test rendering policy page

## ERROR HANDLING
- If username or password is invalid, display error messge
- If failed to fetch data from server, display error message

## TIME
10 hrs
