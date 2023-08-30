import { useState, useEffect } from 'react'
import './App.css'
import avatars from "./avatars.jpg"
import dataset from "./data.json"
// import productsData from "./products.json"
// import customersData from "./customers.json"

function App() {
  const [data, setData] = useState([])
  const [products, setProducts] = useState([])
  const [customers, setCustomers] = useState([])

  const [selectedItemId, setSelectedItemId] = useState(0)
  const [selectedItem, setSelectedItem] = useState("")

  const [selectedCustomerId, setSelectedCustomerId] = useState(0)
  const [selectedCustomer, setSelectedCustomer] = useState("")

  const [selectedPersonalization, setSelectedPersonalization] = useState("")


  useEffect(() => {
    setData(dataset)
    setProducts(dataset.products)
    setCustomers(dataset.personas)
  }, []);

  const changePersonalization = (productId, customerId) => {
    if (productId !== 0 && customerId !== 0) {
      const dataArray = Object.entries(data)
      const product = dataArray[1][1].filter(item => item.id === productId);
      const personalization = product[0].personalizations.find(item => item.persona_id === customerId);
      setSelectedPersonalization(personalization.personalized_description)
    }
  }

  const handleProductSelectChange = (e) => {
    const productId = parseInt(e.target.value);
    setSelectedItemId(productId);

    if (productId === 0) {
      setSelectedItem(""); // Reset selectedItem when "Pick one" is selected
      setSelectedItemId(0)
      setSelectedPersonalization("")
    } else {
      const selectedProduct = products.find(item => item.id === productId);
      setSelectedItem(selectedProduct);
      if (selectedCustomerId !== 0) {
        changePersonalization(productId, selectedCustomerId)
      }
    }
  }

  const handleCustomerSelectChange = (e) => {
    const customerId = parseInt(e.target.value);
    setSelectedCustomerId(customerId);

    if (customerId === 0) {
      setSelectedCustomer(""); // Reset selectedItem when "Pick one" is selected
      setSelectedCustomerId(0)
      setSelectedPersonalization("")
    } else {
      const selectedCust = customers.find(item => item.id === customerId);
      setSelectedCustomer(selectedCust);
      if (selectedItemId !== 0) {
        changePersonalization(selectedItemId, customerId)
      }
    }
  }


  return (
    <div className="container sm:mx-auto p-6 max-w-5xl">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary">
          Generative AI - Personalized Product Description
        </h1>
      </div>

      <div className="mt-6 md:mt-8 md:flex flex-row">
        {/* Product selection */}
        <div className="form-control w-full md:mr-5">
          <label className="label">
            <span className="label-text font-semibold text-lg">Product</span>
          </label>
          <select className="select select-bordered" value={selectedItemId} onChange={handleProductSelectChange}>
            <option value="0">Pick one</option>
            {products.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>

        {/* Customer selection */}
        <div className="form-control w-full md:ml-5">
          <label className="label">
            <span className="label-text font-semibold text-lg">Customer</span>
          </label>
          <select className="select select-bordered" value={selectedCustomerId} onChange={handleCustomerSelectChange}>
            <option value="0">Pick one</option>
            {customers.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>


      <div className="flex flex-col justify-center">
        <div className="mt-5 md:flex flex-row">
          {/* Product image */}
          <div className={selectedItemId === 0 ? "card bg-base-100 shadow-xl mt-5 md:w-1/2 md:mr-5 flex items-center justify-center" : "card bg-base-100 shadow-xl mt-5 md:w-1/2 md:mr-5"}>
            <div className="pt-5 flex items-center justify-center">
              <img src={selectedItemId === 0 ? "https://img.freepik.com/vecteurs-libre/sac-provisions-pour-doodle_1034-533.jpg?w=740&t=st=1693298170~exp=1693298770~hmac=bf73fe1d6de754b62507bfe85a516258ab9b687a447c63cf45ae23e4cb1cfe4f"
                : selectedItem.image}
                className="object-contain h-60 w-96" alt="Shoes"
              />
            </div>
            <div className="card-body">
              <h2 className="card-title">{selectedItemId === 0 ? "Select a Product" : selectedItem.name}</h2>
              {selectedItemId !== 0 &&
                <>
                  <p><span className="font-semibold">Price : </span>{selectedItem.price} €</p>
                </>
              }
            </div>
          </div>

          {/* Customer info */}
          <div className="card bg-base-100 shadow-xl bg-primary text-white mt-5 md:w-1/2 md:ml-5 flex items-center justify-center">
            <div className="pt-5">
              <img src={selectedCustomerId === 0 ? avatars : selectedCustomer.image} className="object-contain h-60 w-96" alt="Customer" />
            </div>
            <div className="card-body">
              <h2 className="card-title">{selectedCustomerId === 0 ? "Select a Customer" : selectedCustomer.name}</h2>
              {selectedCustomerId !== 0 &&
                <>
                  <p><span className="font-semibold">Age : </span>{selectedCustomer.age}</p>
                  <p className="text-justify">{selectedCustomer.description}</p>
                </>
              }
            </div>
          </div>
        </div>


        {/* Raw product description */}
        <div className="card bg-base-100 shadow-xl mt-5">
          <div className="card-body">
            <h2 className="card-title">
              <img src="./assets/description.png" className="w-6 h-6" />
              Raw product description
            </h2>
            <p className="text-justify">{selectedItemId === 0 ? "Select a product to display the description" : selectedItem.description}</p>
          </div>
        </div>

        {/* Personalized product description */}
        <div className="card bg-primary text-white mt-5">
          <div className="card-body">
            <h2 className="card-title">
              <img src="./assets/star-wh.png" className="w-6 h-6" />
              Personalized product description
            </h2>
            <p className="text-justify">{selectedPersonalization === "" ? "Select a product and a customer to display the personalized description" : selectedPersonalization}</p>
          </div>
        </div>
      </div>

      <footer className="footer footer-center p-6 text-base-content">
        <div>
          <p>Copyright © 2023 - Crafted by <a href="https://www.linkedin.com/in/wadieh-k-865b40181/"
            className="link text-accent"
            target="_blank">Wadieh K.
          </a>
          </p>
          <p>Cutomers illustrations designed by Freepik - <a href="https://www.flaticon.com/fr/icones-gratuites/produit">Icons created by Freepik - Flaticon</a></p>
        </div>
      </footer>
    </div>
  )
}

export default App
