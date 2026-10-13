const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const workflows = new Map();

const defaultSteps = [
  { id: 'discovery', label: 'Discovery & Planning', status: 'pending', description: 'Understanding your requirements and goals' },
  { id: 'design', label: 'Design', status: 'pending', description: 'Creating visual designs and mockups' },
  { id: 'development', label: 'Development', status: 'pending', description: 'Building the solution' },
  { id: 'testing', label: 'Testing & QA', status: 'pending', description: 'Ensuring quality and fixing issues' },
  { id: 'deployment', label: 'Deployment', status: 'pending', description: 'Launching to production' },
  { id: 'review', label: 'Client Review', status: 'pending', description: 'Your feedback and approval' }
];

function createWorkflow(clientName, projectName) {
  const id = uuidv4().slice(0, 8);
  const workflow = {
    id,
    clientName,
    projectName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    steps: defaultSteps.map(s => ({ ...s }))
  };
  workflows.set(id, workflow);
  return workflow;
}

app.post('/api/workflows', (req, res) => {
  const { clientName, projectName } = req.body;
  if (!clientName || !projectName) {
    return res.status(400).json({ error: 'clientName and projectName are required' });
  }
  const workflow = createWorkflow(clientName, projectName);
  res.status(201).json(workflow);
});

app.get('/api/workflows/:id', (req, res) => {
  const workflow = workflows.get(req.params.id);
  if (!workflow) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  res.json(workflow);
});

app.patch('/api/workflows/:id/steps/:stepId', (req, res) => {
  const workflow = workflows.get(req.params.id);
  if (!workflow) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  const step = workflow.steps.find(s => s.id === req.params.stepId);
  if (!step) {
    return res.status(404).json({ error: 'Step not found' });
  }
  const { status, description } = req.body;
  if (status) step.status = status;
  if (description) step.description = description;
  workflow.updatedAt = new Date().toISOString();
  res.json(workflow);
});

app.patch('/api/workflows/:id', (req, res) => {
  const workflow = workflows.get(req.params.id);
  if (!workflow) {
    return res.status(404).json({ error: 'Workflow not found' });
  }
  const { clientName, projectName } = req.body;
  if (clientName) workflow.clientName = clientName;
  if (projectName) workflow.projectName = projectName;
  workflow.updatedAt = new Date().toISOString();
  res.json(workflow);
});

app.get('/api/workflows', (req, res) => {
  res.json(Array.from(workflows.values()));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
