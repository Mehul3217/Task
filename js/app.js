const Enquiry = document.querySelector('#Enquiry');
const Site_Visit = document.querySelector('#Site_Visit');
const Won = document.querySelector('#Won');

const form = document.querySelector('#add-project-form');
const lists = document.querySelectorAll('.list');

function make_card(doc){
    let card = document.createElement('div');
    card.className = "list-item";
    card.style.cssText = 'cursor: pointer'
    card.draggable = 'true';
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
    let Name = document.createElement('div');
    let Id = document.createElement('div');
    let Req = document.createElement('div');
    let Date = document.createElement('div');
    d1a.setAttribute('data-id', doc.id);
    d1b.setAttribute('data-id', doc.id);
    d2a.setAttribute('data-id', doc.id);
    d2b.setAttribute('data-id', doc.id);
    Id.textContent = doc.data().Id;
    Name.textContent = doc.data().Name;
    Req.textContent = doc.data().Req;
    var obj  = doc.data().Date;
    Date.textContent = new window.Date(obj["seconds"]*1000).toDateString();
    d1a.appendChild(Id);
    d1b.appendChild(Date);
    d2a.appendChild(Name);
    d2b.appendChild(Req);
    card_row1.appendChild(d1a);
    card_row1.appendChild(d1b);
    card_row2.appendChild(d2a);
    card_row2.appendChild(d2b);
    card_cont.appendChild(card_row1);
    card_cont.appendChild(hr);
    card_cont.appendChild(card_row2);
    card_body.appendChild(card_cont);
    card.appendChild(card_body);
    return card;
}

function dragndrop(card,list_i,doc,drag)
{
    console.log(list_i);
    card.addEventListener('dragstart', function(e) {
        e.stopPropagation();
        drag  = card;
        idd = doc.id;
        console.log('drag started');
        console.log(doc.id);
        setTimeout(function(){
            card.style.display = 'none';
        }, 0);
    });
    card.addEventListener('dragend', function(e) {
        e.stopPropagation();
        console.log('drag ended');
        console.log(doc.id);
        setTimeout(function() {
            card.style.display = 'block';
            drag = null;
            idd = null;
        }, 0);
    });
    for(let j=0;j<lists.length;j++)
    {
        const list = lists[j];
        list.addEventListener('dragover',function(e){
            e.stopPropagation();
            e.preventDefault();
        })
        list.addEventListener('dragenter',function(e){
            e.stopPropagation();
            e.preventDefault();
        })
        list.addEventListener('drop', function(e){
            e.stopPropagation();
            if(drag!=null)
            {
                this.append(drag);
                if(this.id == "Site_Visit")
                {
                    db.collection('Site_Visit').add({
                        Name: doc.data().Name,
                        Req: doc.data().Req,
                        Date: doc.data().Date,
                        Id: 1
                    })
                }
                else if(this.id == "Enquiry")
                {
                    db.collection('Enquiry').add({
                        Name: doc.data().Name,
                        Req: doc.data().Req,
                        Date: doc.data().Date,
                        Id: 1
                    })
                }
                else
                {
                    db.collection('Won').add({
                        Name: doc.data().Name,
                        Req: doc.data().Req,
                        Date: doc.data().Date,
                        Id: 1
                    })
                }
                db.collection(list_i).doc(idd).delete();
            }
        })
    }
}

db.collection('Enquiry').get().then(snapshot => {
    var data = snapshot.docs;
    for(i=0;i<data.length;i++)
    {
        let card = make_card(data[i]);
        Enquiry.appendChild(card);
        let drag = null,idd = null;
        dragndrop(card,'Enquiry',data[i],drag,idd);
    }
})

db.collection('Won').get().then(snapshot => {
    var data = snapshot.docs;
    for(i=0;i<data.length;i++)
    {
        let card = make_card(data[i]);
        Won.appendChild(card);
        let drag = null,idd = null;
        dragndrop(card,'Won',data[i],drag,idd);
    }
})

db.collection('Site_Visit').get().then(snapshot => {
    var data = snapshot.docs;
    for(i=0;i<data.length;i++)
    {
        let card = make_card(data[i]);
        Site_Visit.appendChild(card);
        let drag = null,idd = null;
        dragndrop(card,'Site_Visit',data[i],drag,idd);
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Enquiry').add({
        Name: form.name.value,
        Req: form.req.value,
        Date: new Date(),
        Id: 1
    })
    form.name.value = '';
    form.req.value = '';
})

// let idx=10;
// function load()
// {
//     if(idx < data.length)
//     {
//         let j = 10 + idx;
//         if(data.length < j)
//             j = data.length
//         for(i=idx;i<j;i++)
//             renderusers(data[i]);
//         idx+=10;
//     }
// }