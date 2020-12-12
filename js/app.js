const order = document.querySelector('#user');
const form = document.querySelector('#add-project-form')
// const boxes = document.getElementsByClassName('col-sm-4 adiv');
var data

function renderusers(doc)
{
    let card = document.createElement('div');
    card.className = "card";
    card.style.cssText = 'cursor: pointer'
    // card.draggable = 'true';

    let card_body = document.createElement('div');
    card_body.className = 'card-body';
    let card_cont = document.createElement('div');
    card_cont.className = 'container';
    let card_row1 = document.createElement('div');
    card_row1.className = 'row';
    let card_row2 = document.createElement('div');
    card_row2.className = 'row';
    let hr = document.createElement('hr');
    let br = document.createElement('br');

    let d1a = document.createElement('div');
    d1a.className = 'col-4';
    d1a.style.cssText = 'text-align: left';
    let d1b = document.createElement('div');
    d1b.className = 'col-8';
    d1b.style.cssText = 'text-align: right';
    let d2a = document.createElement('div');
    d2a.className = 'col-8';
    d2a.style.cssText = 'text-align: left';
    let d2b = document.createElement('div');
    d2b.className = 'col-4';
    d2b.style.cssText = 'text-align: right';
    let name = document.createElement('div');
    let id = document.createElement('div');
    let req = document.createElement('div');
    let date = document.createElement('div');

    d1a.setAttribute('data-id', doc.id);
    d1b.setAttribute('data-id', doc.id);
    d2a.setAttribute('data-id', doc.id);
    d2b.setAttribute('data-id', doc.id);
    id.textContent = doc.data().id;
    name.textContent = doc.data().name;
    req.textContent = doc.data().req;
    var obj  = doc.data().date;
    date.textContent = new Date(obj["seconds"]*1000).toDateString();


    d1a.appendChild(id);
    d1b.appendChild(date);
    d2a.appendChild(name);
    d2b.appendChild(req);

    card_row1.appendChild(d1a);
    card_row1.appendChild(d1b);
    card_row2.appendChild(d2a);
    card_row2.appendChild(d2b);
    card_cont.appendChild(card_row1);
    card_cont.appendChild(hr);
    card_cont.appendChild(card_row2);
    card_body.appendChild(card_cont);
    
    card.appendChild(card_body);
    // cards.push(card);
    order.appendChild(card);
    order.appendChild(br);

    
}

db.collection('Data').get().then(snapshot => {
    data = snapshot.docs;
    let j = 10;
    if(data.length < j)
        j = data.length
    for(i=0;i<j;i++)
        renderusers(data[i]);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Data').add({
        name: form.name.value,
        req: form.req.value,
        date: new Date(),
        id: 1
    })
    form.name.value = '';
    form.req.value = '';
    
})


idx=10;
function load()
{
    if(idx < data.length)
    {
        let j = 10 + idx;
        if(data.length < j)
            j = data.length
        for(i=idx;i<j;i++)
            renderusers(data[i]);
        idx+=10;
    }
}