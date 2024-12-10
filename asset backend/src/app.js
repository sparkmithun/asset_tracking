const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the cors package

const app = express();

// Enable CORS for all routes
app.use(cors());  
// Initialize Express app
// const app = express();
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database('./assets.db');

// Create the assets table
db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS asset_allocation (
      allocation_id INTEGER PRIMARY KEY AUTOINCREMENT,
      asset_id TEXT NOT NULL,
      asset_type TEXT NOT NULL,
      brand TEXT NOT NULL,
      employee_id TEXT NOT NULL,
      employee_name TEXT NOT NULL,
      department TEXT NOT NULL,
      location_type TEXT NOT NULL,
      branch TEXT NOT NULL,
      classroom_lab_name TEXT NOT NULL,
      allocation_date TEXT NOT NULL,
      FOREIGN KEY (asset_id) REFERENCES assets (asset_id)
    )
  `);
  // Create the Asset Allocation table
    console.log('Asset Allocation table created.');
    
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS assets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                asset_type TEXT NOT NULL,
                brand TEXT NOT NULL,
                price REAL NOT NULL,
                arrival_date TEXT NOT NULL,
                vendor_name TEXT NOT NULL,
                warranty_details TEXT NOT NULL,
                asset_id TEXT NOT NULL UNIQUE,
                department TEXT NOT NULL CHECK (department IN ('CSE', 'ISE', 'ECE', 'EEE', 'Civil', 'Mech')),
                status TEXT CHECK (status IN ('active', 'inactive', 'depricated')) DEFAULT 'active'
            )
        `);
        console.log('Assets table with status column created.');
        // Create the report_assets table
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS report_assets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                asset_id TEXT NOT NULL,
                asset_type TEXT NOT NULL,
                brand TEXT NOT NULL,
                branch TEXT NOT NULL,
                location TEXT NOT NULL,
                employee_id TEXT NOT NULL,
                employee_name TEXT NOT NULL,
                department TEXT NOT NULL CHECK (department IN ('CSE', 'ISE', 'ECE', 'EEE', 'Civil', 'Mech')),
                problem_description TEXT NOT NULL,
                reported_by TEXT NOT NULL,
                contact_info TEXT NOT NULL
            )
        `);
        console.log('Report Assets table created.');
    });

    });
});

// Route to report assest
app.post('/report-assets', (req, res) => {
    const { asset_id, asset_type, brand, branch, location, employee_id, employee_name, department, problem_description, reported_by, contact_info } = req.body;

    // Validate input
    if (!asset_id || !asset_type || !brand || !branch || !location || !employee_id || !employee_name || !department || !problem_description || !reported_by || !contact_info) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const allowedDepartments = ['CSE', 'ISE', 'ECE', 'EEE', 'Civil', 'Mech'];
    if (!allowedDepartments.includes(department)) {
        return res.status(400).json({ error: `Invalid department. Allowed values are: ${allowedDepartments.join(', ')}` });
    }

    const query = `
        INSERT INTO report_assets (asset_id, asset_type, brand, branch, location, employee_id, employee_name, department, problem_description, reported_by, contact_info)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        query,
        [asset_id, asset_type, brand, branch, location, employee_id, employee_name, department, problem_description, reported_by, contact_info],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Asset problem reported successfully!', id: this.lastID });
        }
    );
});

// Route to fetch all reported assets
app.get('/reported-assets', (req, res) => {
    // Query to get all reported assets
    const query = 'SELECT * FROM report_assets';

    // Execute the query
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No reported assets found.' });
        }

        res.status(200).json(rows); // Return the found assets
    });
});
// Route to fetch reported assets based on query parameters
app.get('/reported-assets', (req, res) => {
    const { asset_id, department, employee_name, branch } = req.query;

    // Initialize the query and parameters array
    let query = 'SELECT * FROM report_assets WHERE 1=1';
    let params = [];

    // Dynamically build the query based on provided query parameters
    if (asset_id) {
        query += ' AND asset_id = ?';
        params.push(asset_id);
    }

    if (department) {
        query += ' AND department = ?';
        params.push(department);
    }

    if (employee_name) {
        query += ' AND employee_name = ?';
        params.push(employee_name);
    }

    if (branch) {
        query += ' AND branch = ?';
        params.push(branch);
    }

    // Execute the query
    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No reported assets found.' });
        }

        res.status(200).json(rows); // Return the found assets
    });
});

// Route to transfer an asset
app.post('/transfer-asset', (req, res) => {
    const { asset_id, status } = req.body;

    // Validate input
    if (!asset_id || !status) {
        return res.status(400).json({ error: 'Asset ID and status are required.' });
    }

    const allowedStatuses = ['active', 'inactive', 'depricated'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Allowed values are: ${allowedStatuses.join(', ')}` });
    }

    // Check if the asset exists
    const checkQuery = `SELECT * FROM assets WHERE asset_id = ?`;
    db.get(checkQuery, [asset_id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ message: `Asset with ID ${asset_id} not found.` });
        }

        // Update asset status
        const updateQuery = `UPDATE assets SET status = ? WHERE asset_id = ?`;
        db.run(updateQuery, [status, asset_id], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(200).json({ message: `Asset ${asset_id} status updated to ${status}.` });
        });
    });
});


// GET route to fetch allocated assets
app.get('/allocated-assets', (req, res) => {
    const { allocation_id } = req.query;
  
    let query = `SELECT * FROM asset_allocation`;
    const params = [];
  
    // Add filtering if allocation_id is provided
    if (allocation_id) {
      query += ` WHERE allocation_id = ?`;
      params.push(allocation_id);
    }
  
    db.all(query, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No allocated assets found.' });
      }
  
      res.status(200).json(rows);
    });
  });
  

// POST route to allocate asset
app.post('/allocate-asset', (req, res) => {
  const {
    asset_id, employee_id, employee_name, department, location_type, branch,
    classroom_lab_name, allocation_date
  } = req.body;

  // Fetch asset details based on Asset ID
  db.get(`SELECT asset_type, brand FROM assets WHERE asset_id = ?`, [asset_id], (err, asset) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!asset) {
      return res.status(404).json({ message: `Asset with ID ${asset_id} not found.` });
    }

    const { asset_type, brand } = asset;

    // Insert allocation data
    const query = `
      INSERT INTO asset_allocation
      (asset_id, asset_type, brand, employee_id, employee_name, department, location_type, branch, classroom_lab_name, allocation_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [
        asset_id, asset_type, brand, employee_id, employee_name, department, location_type, branch,
        classroom_lab_name, allocation_date
      ],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Asset allocated successfully!', allocation_id: this.lastID });
      }
    );
  });
});


// app.post('/assets', (req, res) => {
//     const { asset_type, brand, price, arrival_date, vendor_name, warranty_details, asset_id, department } = req.body;
  
//     // Validate input
//     if (!asset_type || !brand || !price || !arrival_date || !vendor_name || !warranty_details || !asset_id || !department) {
//       return res.status(400).json({ error: 'All fields are required.' });
//     }
  
//     const allowedDepartments = ['CSE', 'ISE', 'ECE', 'EEE', 'Civil', 'Mech'];
//     if (!allowedDepartments.includes(department)) {
//       return res.status(400).json({ error: `Invalid department. Allowed values are: ${allowedDepartments.join(', ')}` });
//     }
  
//     const query = `
//       INSERT INTO assets (asset_type, brand, price, arrival_date, vendor_name, warranty_details, asset_id, department)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;
  
//     db.run(
//       query,
//       [asset_type, brand, price, arrival_date, vendor_name, warranty_details, asset_id, department],
//       function (err) {
//         if (err) {
//           return res.status(500).json({ error: err.message });
//         }
//         res.status(201).json({ message: 'Asset added successfully!', id: this.lastID });
//       }
//     );
// });


//post add request
app.post('/assets/many', (req, res) => {
    const assets = req.body; // Expecting an array of JSON objects
  
    // Validate input
    if (!Array.isArray(assets) || assets.length === 0) {
      return res.status(400).json({ error: 'Invalid input, expected an array of assets.' });
    }
  
    const allowedDepartments = ['CSE', 'ISE', 'ECE', 'EEE', 'Civil', 'Mech'];
  
    // Query to insert each asset
    const query = `
      INSERT INTO assets (asset_type, brand, price, arrival_date, vendor_name, warranty_details, asset_id, department)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    // Insert each asset
    let errorOccurred = false;
    assets.forEach((asset) => {
      const { asset_type, brand, price, arrival_date, vendor_name, warranty_details, asset_id, department } = asset;
  
      if (
        !asset_type ||
        !brand ||
        !price ||
        !arrival_date ||
        !vendor_name ||
        !warranty_details ||
        !asset_id ||
        !department ||
        !allowedDepartments.includes(department)
      ) {
        errorOccurred = true;
        return;
      }
  
      db.run(
        query,
        [asset_type, brand, price, arrival_date, vendor_name, warranty_details, asset_id, department],
        (err) => {
          if (err) {
            console.error(`Error inserting asset ID ${asset_id}: ${err.message}`);
            errorOccurred = true;
          }
        }
      );
    });
  
    if (errorOccurred) {
      return res.status(500).json({ message: 'Some errors occurred while inserting assets.' });
    }
  
    res.status(201).json({ message: 'All assets added successfully!' });
  });
  

//POST route to add assets 
app.post('/assets', (req, res) => {
    const { asset_type, brand, price, arrival_date, vendor_name, warranty_details, asset_id, department } = req.body;
  
    // Validate input
    if (!asset_type || !brand || !price || !arrival_date || !vendor_name || !warranty_details || !asset_id || !department) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    const allowedDepartments = ['CSE', 'ISE', 'ECE', 'EEE', 'Civil', 'Mech'];
    if (!allowedDepartments.includes(department)) {
      return res.status(400).json({ error: `Invalid department. Allowed values are: ${allowedDepartments.join(', ')}` });
    }
  
    const query = `
      INSERT INTO assets (asset_type, brand, price, arrival_date, vendor_name, warranty_details, asset_id, department)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    db.run(
      query,
      [asset_type, brand, price, arrival_date, vendor_name, warranty_details, asset_id, department],
      function (err) {
        if (err) {
          console.error('Error inserting asset:', err.message); // Log the error on the backend
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Asset added successfully!', id: this.lastID });
      }
    );
});

//get request
app.get('/assets/department/:department', (req, res) => {
    const { department } = req.params;
  
    // Allowed departments
    const allowedDepartments = ['CSE', 'ISE', 'ECE', 'EEE', 'Civil', 'Mech'];
  
    // Validate department
    if (!allowedDepartments.includes(department)) {
      return res.status(400).json({
        error: `Invalid department. Allowed values are: ${allowedDepartments.join(', ')}`,
      });
    }
  
    // Query to get assets by department
    const query = `SELECT * FROM assets WHERE department = ?`;
  
    db.all(query, [department], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      if (rows.length === 0) {
        return res.status(404).json({ message: `No assets found for department ${department}` });
      }
  
      res.status(200).json(rows);
    });
  });
  
  
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
