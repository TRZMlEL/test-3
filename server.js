const { TuyaContext } = require('@tuya/tuya-connector-nodejs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Create a new instance of TuyaContext with your credentials
const connector = new TuyaContext({
  baseUrl: 'https://openapi.tuyaeu.com', // Ensure the base URL matches your region
  accessKey: 'nxfr4duckrts7nunc7qv',
  secretKey: '928eb491d1f14dc3a747592cf3de7401',
});

// Middleware to serve static files (like HTML)
app.use(express.static('public'));
app.use(bodyParser.json());

// Function to get device list
async function getDeviceList() {
  try {
    const response = await connector.request({
      method: 'GET',
      path: '/v1.0/iot-03/devices?page_no=1&page_size=20',
    });
    console.log('Device List Response:', response); // Log response
    return response;
  } catch (error) {
    console.error('Error fetching devices:', error);
    return null;
  }
}

// Function to get user list
async function getUserList() {
  try {
    const response = await connector.request({
      method: 'GET',
      path: '/v1.0/iot-03/users',
    });
    console.log('User List Response:', response); // Log response
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}

// Function to get application list
async function getApplicationList() {
  try {
    const response = await connector.request({
      method: 'GET',
      path: '/v1.0/iot-03/applications',
    });
    console.log('Application List Response:', response); // Log response
    return response;
  } catch (error) {
    console.error('Error fetching applications:', error);
    return null;
  }
}

// Function to get user information
async function getUserInfo(userId) {
  try {
    const response = await connector.request({
      method: 'GET',
      path: `/v1.0/iot-03/users/${userId}`,
    });
    console.log('User Info Response:', response); // Log response
    return response;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
}

// Function to get device details
async function getDeviceDetails(deviceId) {
  try {
    const response = await connector.request({
      method: 'GET',
      path: `/v1.0/iot-03/devices/${deviceId}`,
    });
    console.log('Device Details Response:', response); // Log response
    return response;
  } catch (error) {
    console.error('Error fetching device details:', error);
    return null;
  }
}

// Function to get device status history
async function getDeviceStatus(deviceId) {
  try {
    const response = await connector.request({
      method: 'GET',
      path: `/v1.0/iot-03/devices/${deviceId}/status`,
    });
    console.log('Device Status Response:', response); // Log response
    return response;
  } catch (error) {
    console.error('Error fetching device status:', error);
    return null;
  }
}

// Function to get application details
async function getApplicationDetails(appId) {
  try {
    const response = await connector.request({
      method: 'GET',
      path: `/v1.0/iot-03/applications/${appId}`,
    });
    console.log('Application Details Response:', response); // Log response
    return response;
  } catch (error) {
    console.error('Error fetching application details:', error);
    return null;
  }
}

// Function to get project details
async function getProjectDetails(projectId) {
  try {
    const response = await connector.request({
      method: 'GET',
      path: `/v1.0/iot-03/projects/${projectId}`,
    });
    console.log('Project Details Response:', response); // Log response
    return response;
  } catch (error) {
    console.error('Error fetching project details:', error);
    return null;
  }
}

// Function to get device groups
async function getDeviceGroups() {
  try {
    const response = await connector.request({
      method: 'GET',
      path: '/v1.0/iot-03/device-groups',
    });
    console.log('Device Groups Response:', response); // Log response
    return response;
  } catch (error) {
    console.error('Error fetching device groups:', error);
    return null;
  }
}

// Function to get configurations
async function getConfigurations() {
  try {
    const response = await connector.request({
      method: 'GET',
      path: '/v1.0/iot-03/configurations',
    });
    console.log('Configurations Response:', response); // Log response
    return response;
  } catch (error) {
    console.error('Error fetching configurations:', error);
    return null;
  }
}

// Function to get events
async function getEvents() {
  try {
    const response = await connector.request({
      method: 'GET',
      path: '/v1.0/iot-03/events',
    });
    console.log('Events Response:', response); // Log response
    return response;
  } catch (error) {
    console.error('Error fetching events:', error);
    return null;
  }
}

// Function to control a device
async function controlDevice(deviceId, commands) {
  try {
    const response = await connector.request({
      method: 'POST',
      path: `/v1.0/iot-03/devices/${deviceId}/commands`,
      body: { commands },
    });
    console.log('Control Device Response:', response); // Log response
    return response;
  } catch (error) {
    console.error('Error controlling device:', error);
    return null;
  }
}

// Route to handle device control
app.post('/control', async (req, res) => {
  const { deviceId, switchState } = req.body;

  const response = await controlDevice(deviceId, [
    { code: 'switch_1', value: switchState },
  ]);

  if (response && response.success) {
    res.send('Device controlled successfully');
  } else {
    res.status(500).send('Error controlling device');
  }
});

// Route to display device list
app.get('/devices', async (req, res) => {
  const devices = await getDeviceList();
  res.json(devices);
});

// Route to display user list
app.get('/users', async (req, res) => {
  const users = await getUserList();
  res.json(users);
});

// Route to display application list
app.get('/applications', async (req, res) => {
  const applications = await getApplicationList();
  res.json(applications);
});

// Route to display user info
app.get('/users/:userId', async (req, res) => {
  const userInfo = await getUserInfo(req.params.userId);
  res.json(userInfo);
});

// Route to display device details
app.get('/devices/:deviceId', async (req, res) => {
  const deviceDetails = await getDeviceDetails(req.params.deviceId);
  res.json(deviceDetails);
});

// Route to display device status history
app.get('/devices/:deviceId/status', async (req, res) => {
  const deviceStatus = await getDeviceStatus(req.params.deviceId);
  res.json(deviceStatus);
});

// Route to display application details
app.get('/applications/:appId', async (req, res) => {
  const appDetails = await getApplicationDetails(req.params.appId);
  res.json(appDetails);
});

// Route to display project details
app.get('/projects/:projectId', async (req, res) => {
  const projectDetails = await getProjectDetails(req.params.projectId);
  res.json(projectDetails);
});

// Route to display device groups
app.get('/device-groups', async (req, res) => {
  const deviceGroups = await getDeviceGroups();
  res.json(deviceGroups);
});

// Route to display configurations
app.get('/configurations', async (req, res) => {
  const configurations = await getConfigurations();
  res.json(configurations);
});

// Route to display events
app.get('/events', async (req, res) => {
  const events = await getEvents();
  res.json(events);
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
