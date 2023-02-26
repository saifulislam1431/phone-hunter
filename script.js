const getData = (id, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${id}`
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data, dataLimit))
        .catch(error => console.log(error))


}

// Display data
const displayData = (phones, dataLimit) => {

    const phnContainer = document.getElementById('phn-container');

    // Show all phone
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10)
        document.getElementById('show-all').classList.remove('hidden')
    } else {
        document.getElementById('show-all').classList.add('hidden')
    }

    // Phone not found condition
    if (phones.length == 0) {
        document.getElementById('no-phn').classList.remove('hidden')
    } else {
        document.getElementById('no-phn').classList.add('hidden')
    }


    phones.forEach(phone => {
        console.log(phone);
        const phnDiv = document.createElement('div')
        phnDiv.classList.add('card')
        phnDiv.classList.add('w-96')
        phnDiv.classList.add('shadow-md')
        phnDiv.classList.add('shadow-emerald-100')
        phnDiv.classList.add('bg-slate-300')
        phnDiv.classList.add('text-slate-800')
        phnDiv.classList.add('mr-5')
        phnDiv.innerHTML = `
                    <figure><img src="${phone.image}" alt="Iphone" class="rounded-lg pt-3" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>Brand: ${phone.brand}</p>
                        <div class="card-actions justify-end">
                        <label onclick = "loadingDetails('${phone.slug}')" for="my-modal-5" class="btn rounded-md">See Details</label>
                        </div>
                    </div>
        `
        phnContainer.appendChild(phnDiv)
    });
    loading(false)

}



// Process Search
const process = (dataLimit) => {
    loading(true)
    const inputFieldValue = document.getElementById('search-field').value;
    getData(inputFieldValue, dataLimit)

}

// Clicked handler
document.getElementById('search').addEventListener('click', () => {

    process(10)
})

// Press handler
document.getElementById('search-field').addEventListener("keypress", (e) => {

    if (e.key == 'Enter') {
        process(10)
    }

})

// Show all btn
const showAllPhn = document.getElementById('show-all-btn').addEventListener('click', () => {
    // document.getElementById('phn-container').innerHTML = ''
    process();
})


//For loading
const loading = isLoad => {
    const loader = document.getElementById('loading');
    if (isLoad) {
        loader.classList.remove = 'hidden'
    } else {
        loader.classList.add = 'hidden'
    }
}

// load Phone Details

const loadingDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data);
}

// Display phone details
const displayDetails = phone => {
    console.log(phone);
    const title = document.getElementById('m-title')
    title.innerText = phone.data.name

    const feature = document.getElementById('feature-container')

    feature.innerHTML = `
    <li>Chip Set: ${phone.data.mainFeatures.chipSet}</li>
    <li>Display Size: ${phone.data.mainFeatures.displaySize}</li>
    <li>Memory: ${phone.data.mainFeatures.memory}</li>
    `
}