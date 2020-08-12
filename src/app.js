table_entries = []
table_publishers = []
table_users = []

App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const gox = await $.getJSON('Gox.json')
    App.contracts.Gox = TruffleContract(gox)
    App.contracts.Gox.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.gox = await App.contracts.Gox.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    console.log('awaiting tasks...')
    
    await App.renderAll()
    
    console.log('done')
    // Update loading state
    App.setLoading(false)
  },

  loadEntries: async () => {
    // Load the total task count from the blockchain
    const entriesCnt = await App.gox.entriesCnt()
    console.log('entriesCnt = ' + entriesCnt)
    // Render out each task with a new task template
    for (var i = 1; i <= entriesCnt; i++) {
      // Fetch the task data from the blockchain
      const entry = await App.gox.entries(i)
      console.log('entry = ' + entry)
      table_entry = {
        "id": entry[0].toNumber(),
        "uid": entry[1].toNumber(),
        "pid": entry[2].toNumber(),
        "content": entry[3]
      }
      table_entries.push(table_entry)
    }
  },

  loadUsers: async () => {
    // Load the total task count from the blockchain
    const usersCnt = await App.gox.usersCnt()
    console.log('usersCnt = ' + usersCnt)
    // Render out each task with a new task template
    for (var i = 1; i <= usersCnt; i++) {
      // Fetch the task data from the blockchain
      const entry = await App.gox.users(i)
      table_entry = {
        "id": entry[0].toNumber(),
        "name": entry[1]
      }
      table_users.push(table_entry)
    }
    console.log(table_users)
  },

  loadPublishers: async () => {
    // Load the total task count from the blockchain
    const publishersCnt = await App.gox.publishersCnt()
    console.log('publishersCnt = ' + publishersCnt)
    // Render out each task with a new task template
    for (var i = 1; i <= publishersCnt; i++) {
      // Fetch the task data from the blockchain
      const entry = await App.gox.publishers(i)
      table_entry = {
        "id": entry[0].toNumber(),
        "name": entry[1]
      }
      table_publishers.push(table_entry)
    }
    console.log(table_publishers)
  },

  renderAll: async () => {
    await App.loadEntries()
    await App.loadUsers()
    await App.loadPublishers()
    App.loadTableData(table_entries, 'entries_table', 4, ['id','uid', 'pid', 'content']) 
    App.loadTableData(table_users, 'users_table', 2, ['id','name']) 
    App.loadTableData(table_publishers, 'publishers_table', 2, ['id','name']) 
  },

  loadTableData: (items, table_id, row_len, row_keys) => {
    const table = document.getElementById(table_id);  
    items.forEach( item => {
      let row = table.insertRow();
      for (let i = 0; i < row_len; i++) {
        row.insertCell(i).innerHTML = item[row_keys[i]]
      }
    });
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  },

  // createTask: async () => {
  //   App.setLoading(true)
  //   const content = $('#newTask').val()
  //   await App.gox.createTask(content)
  //   window.location.reload()
  // },

  // toggleCompleted: async (e) => {
  //   App.setLoading(true)
  //   const taskId = e.target.name
  //   await App.gox.toggleCompleted(taskId)
  //   window.location.reload()
  // },

}

$(() => {
  $(window).load(() => {
    App.load()
  })
})

