App is partially resposive, still not finished.

<h1>Garden of Eden </h1>
(Deployed with Firebase - https://garden-of-eden-406ae.web.app))
<h2>Online plant store </h2>
<h3>1. Purpose:</h3> 
It is a SPA, developed as a project for SoftUni Angular module. My goal was to make an online store. The theme was not hard for me to pick, since I am a plant lover. I wanted to find a relatable topic, that would make the project more appealing. The idea is simple - a store, that sells houseplants, users can like and add items to cart, guests can only view the content. I used some different gardening web sites as inspiration.
<h3>2. Technologies :</h3>
<strong>Angular</strong> with <strong>Typescript</strong> <br/>
<strong>HTML</strong> and <strong>CSS</strong> done by me <br>
Back-end provider is firebase - <strong>Realtime Database</strong> <br/> <strong>Firebase authentication</strong> with email/password sign in method. 
<h3>3. App runtrough:</h3>
<h4>3.1. Navigation</h4>
Main navigation in header. There are route guards that prevent users from accessing login and register pages and for guests to access cart and favourites.
    <ul>
      <li>for guests - has links to home, register, login and catalog pages</li>
      <li>for users - has links for catalog, logout, favourites and cart pages</li> 
    </ul> 
<h4>3.2. Home</h4>
home page is dynamic, there is a link to catalog page and a section with the most recently added items.

<h4>3.3. Catalog page</h4> 
     <ul>
      <li>for guests - can view and click on items in catalog</li>
      <li>for users - can additionally like and unlike, add items to cart</li> 
    </ul> 
 <h4>3.4. Details</h4> 
 Users and guests can open details page upon item card click. When item image is clicked the image opens in a modal in full size.
      <ul>
        <li>for guests - basic information about product is shown</li>
        <li>for users - there are add to cart and fvourites button, item can be removed form cart and favourites on second click</li> 
    </ul> 
<h4>3.5. Cart</h4>
All added items are shown, can be deleted from cart or their quantity adjusted. User can click on "continue shopping" button, which leads to catalog, "finish" button leads to nowhere.
    <ul>         
      <li>Table with added items in it</li>
      <li>Cart total section - calculates the whole sum</li>   
    </ul>
<h4>3.6. Authentication pages</h4>
Login and register page use build in angular form validation.
    <ul>
      <li>Login validation:
        <ul>
           <li>for empty fields</li> 
           <li>for wrong password or email</li>   
        </ul>
      </li>
      <li>Register validation:
          <ul>
           <li>for username length(3 chars)</li> 
           <li>for email pattern</li>  
           <li>for empty fields</li> 
           <li>for existing email</li>  
           <li>repeat password and password sameness</li>  
        </ul>
      </li>     
    </ul>
<h4>3.7. Special features</h4>
    <ul>
      <li>Search- search bar is located in header , using Realtime Database query search, is case sensitive </li> 
    </ul>
<h3>4. In development:</h3>
App is partially responsive, I plan on fixing the issue in the near future.
<h3>5. Conclusion:</h3> 






