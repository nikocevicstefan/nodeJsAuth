Kada klonirate pojekat potrebno pokrenuti npm install

Server se pokrece komandom "nodemon"

Lokacija: http://localhost:5000/api/

Rute: <br/>
-login: {email: 'string', password: 'string'} (post)<br/>
-getUser: ruta za verifikaciju tokena. U rezultatu vrati podatke trenutnog User-a (get) <br/>
-createUser: {user: 'string', email: 'string', password: 'sting'} (post)

Kada kreirate user-a uvjek ce dobiti role user. Imate usera admin kome je email "admin@gmail.com" i password admin.
