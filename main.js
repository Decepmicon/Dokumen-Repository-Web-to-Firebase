const rdb = firebase.database();

// Create Data
const name = document.querySelector(`[data-input="nama"]`);
const age = document.querySelector(`[data-input="umur"]`);
const kirim = document.querySelector(`[data-button="kirim"]`);

kirim.onclick = () => {
    rdb.ref('account').push().set({
        "username" : name.value,
        "age" : age.value
    });
}

// Update Data
const nameUpdate = document.querySelector(`[data-input="nama_update"]`);
const ageUpdate = document.querySelector(`[data-input="umur_update"]`);
const buttonUpdate = document.querySelector(`[data-button="update"]`);

buttonUpdate.onclick = () => {
    /*
    Penjelasan :
    jadi querry dibawah ini dia mengupdate pada tabel account dengan
    primary key sebagai acuan dia yaitu "-NG0vvJlK2Z79L5qaLpH"
    lalu dee mengupdate "username" & "update" dengan value baru
    */
    rdb.ref('account/-NG0vvJlK2Z79L5qaLpH').update({
        "username" : nameUpdate.value,
        "age" : ageUpdate.value
    });
}

// Delete Data
const buttonDelete = document.querySelector(`[data-button="delete"]`);

buttonDelete.onclick = () => 
{
    var id = "-NG0p58LZTAIXrRBuQ7W"
    /*
    Penjelasan :
    jadi querry dibawah ini dia mengupdate pada tabel "account" dengan
    primary key sebagai acuan dia yaitu "-NG0p58LZTAIXrRBuQ7W"
    lalu dia mendelete semua key dan value yang ada pada dia.
    */
    rdb.ref('account/' + id).remove();
}

// Search Data
const nameSearch = document.querySelector(`[data-input="nama_search"]`);
const buttonSearch = document.querySelector(`[data-button="search"]`);

buttonSearch.onclick = () => {
    /*
    Penjelasan :
    jadi querry dibawah ini menjelaskan tentang bagaimana kita mencari data di firebase
    dengan pencarian pada tabel "account" terus key dari salah satu tabel yaitu "username"
    setelah itu isi dari key tadi equal to atau dibandingkan dengan apa yang kau cari
    kalau misalnya ada dia akan masuk ke function(snapshot) dan snapshot itu kan obyek
    obyek dari snapshot.foreach iku sehingga dia menjalankan dan menampilkan.
    */
    rdb.ref().child("account").orderByChild('username').equalTo(nameSearch.value).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            document.getElementById("umur_search").innerHTML = childSnapshot.child("age").val();
        })
    });

    // kalau misal belum paham fungsi foreach lihat di link https://www.w3schools.com/jsref/jsref_foreach.asp
}


// Search and Update Data
const nameSearchUpdate = document.querySelector(`[data-input="nama_search_update"]`);
const nameSearchUpdateInput = document.querySelector(`[data-input="nama_search_update_input"]`);
const buttonSearchUpdate = document.querySelector(`[data-button="searchUpdate"]`);

/*
langkah langkah dari tahapan ini adalah pertama search dulu
nah tidak ada perbedaan dari querry search sebelumnya namun pada querry ini 
search digunakan untuk mencari key dari data tersebut setelah itu dia akan 
mengupdate yang dimana querrynya tidak jauh beda dengan querry update sebelumnya
*/
buttonSearchUpdate.onclick = () => {
    var dataId;
    rdb.ref().child("account").orderByChild('username').equalTo(nameSearchUpdate.value).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            dataId = childSnapshot.key;
            rdb.ref('account/' + dataId).update({
                "username" : nameSearchUpdateInput.value,
            });
        })
    });
}

// Search and Delete Data
const nameSearchDelete = document.querySelector(`[data-input="nama_search_delete"]`);
const buttonSearchDelete = document.querySelector(`[data-button="searchDelete"]`);

/*
penjelasan sama seperti querry Search & Update
*/

buttonSearchDelete.onclick = () => {
    var dataId;
    rdb.ref().child("account").orderByChild('username').equalTo(nameSearchDelete.value).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            dataId = childSnapshot.key;
            rdb.ref('account/' + dataId).remove();
        })
    });
}


// Show Data

/*
Penjelasan :
Querry ini sebenarnya hampir sama konsepnya pada querry Search
namun kalau di queery ini yang diambil seluruh data jadi
tanpa pakai equalto.
*/
rdb.ref('account').once('value', function (snapshot) {
    snapshot.forEach(function(childsnapshot) {
        var dataName = childsnapshot.child("username").val();
        var dataAge = childsnapshot.child("age").val();
        AddItemstoTable(dataName, dataAge);
    })

});

function AddItemstoTable(username, age) {
    var tbody = document.getElementById("tbody1");
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    td1.innerHTML = username;
    td2.innerHTML = age;

    trow.appendChild(td1);
    trow.appendChild(td2);
    tbody.appendChild(trow);

}



