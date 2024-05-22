import React, { useState } from 'react';
import './FCFS.css'; // Make sure to create a corresponding CSS file

const Priority = () => {
    const [processes, setProcesses] = useState([]);
    const [results, setResults] = useState([]);
    const [sortedResults, setSortedResults] = useState([]);
    const [averageTAT, setAverageTAT] = useState(0);
    const [averageWT, setAverageWT] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [showAverageTimes, setShowAverageTimes] = useState(false);
    const [showGanttChart, setShowGanttChart] = useState(false);

    const handleInputChange = (index, field, value) => {
        const newProcesses = [...processes];
        newProcesses[index] = { ...newProcesses[index], [field]: value };
        setProcesses(newProcesses);
    };

    const addProcess = () => {
        setProcesses([...processes, { processNumber: '', arrivalTime: '', burstTime: '', priority: '' }]);
    };

    const deleteProcess = (index) => {
        const newProcesses = processes.filter((_, i) => i !== index);
        setProcesses(newProcesses);
    };

    const calculatePriorityScheduling = () => {
        let table = processes.map((process) => ({
            ...process,
            completionTime: 0,
            turnaroundTime: 0,
            waitingTime: 0,
        }));

        // Sort processes by arrival time
        table.sort((a, b) => parseInt(a.arrivalTime) - parseInt(b.arrivalTime));

        let time = 0;
        let totalTAT = 0;
        let totalWT = 0;
        let remainingProcesses = [...table];
        let scheduledProcesses = [];

        while (remainingProcesses.length > 0) {
            let availableProcesses = remainingProcesses.filter((process) => parseInt(process.arrivalTime) <= time);
            if (availableProcesses.length === 0) {
                time++;
                continue;
            }

            availableProcesses.sort((a, b) => parseInt(a.priority) - parseInt(b.priority));
            let highestPriorityProcess = availableProcesses[0];
            let index = remainingProcesses.findIndex((process) => process.processNumber === highestPriorityProcess.processNumber);

            remainingProcesses.splice(index, 1);
            scheduledProcesses.push(highestPriorityProcess);

            let at = parseInt(highestPriorityProcess.arrivalTime);
            let bt = parseInt(highestPriorityProcess.burstTime);
            let ct = time + bt;
            let tat = ct - at;
            let wt = tat - bt;

            highestPriorityProcess.completionTime = ct;
            highestPriorityProcess.turnaroundTime = tat;
            highestPriorityProcess.waitingTime = wt;

            totalTAT += tat;
            totalWT += wt;

            time = ct;
        }

        setResults(scheduledProcesses);
        setSortedResults([...scheduledProcesses].sort((a, b) => parseInt(a.processNumber) - parseInt(b.processNumber)));
        setAverageTAT(totalTAT / scheduledProcesses.length);
        setAverageWT(totalWT / scheduledProcesses.length);
    };

    return (
        <div className="fcfs-container">
            <h1>Priority Scheduling Algorithm</h1>
            <div className="input-container">
                <button onClick={addProcess}>Add Process</button>
            </div>
            <h2>Processes</h2>
            <table className="process-table">
                <thead>
                    <tr>
                        <th>Process Number</th>
                        <th>Arrival Time</th>
                        <th>Burst Time</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {processes.map((process, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="number"
                                    value={process.processNumber}
                                    onChange={(e) => handleInputChange(index, 'processNumber', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={process.arrivalTime}
                                    onChange={(e) => handleInputChange(index, 'arrivalTime', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={process.burstTime}
                                    onChange={(e) => handleInputChange(index, 'burstTime', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={process.priority}
                                    onChange={(e) => handleInputChange(index, 'priority', e.target.value)}
                                />
                            </td>
                            <td><button onClick={() => deleteProcess(index)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="button-container">
                <button onClick={() => { calculatePriorityScheduling(); setShowResults(true); setShowAverageTimes(false); setShowGanttChart(false); }}>Show Result Table</button>
                <button onClick={() => { calculatePriorityScheduling(); setShowAverageTimes(true); setShowResults(false); setShowGanttChart(false); }}>Show Avg TAT & WT</button>
                <button onClick={() => { calculatePriorityScheduling(); setShowGanttChart(true); setShowResults(false); setShowAverageTimes(false); }}>Show Gantt Chart</button>
            </div>
            {showResults && (
                <>
                    <h2>Results</h2>
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Process Number</th>
                                <th>Arrival Time</th>
                                <th>Burst Time</th>
                                <th>Priority</th>
                                <th>Completion Time</th>
                                <th>Turnaround Time</th>
                                <th>Waiting Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedResults.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.processNumber}</td>
                                    <td>{result.arrivalTime}</td>
                                    <td>{result.burstTime}</td>
                                    <td>{result.priority}</td>
                                    <td>{result.completionTime}</td>
                                    <td>{result.turnaroundTime}</td>
                                    <td>{result.waitingTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            {showAverageTimes && (
                <>
                    <h2>Average Times</h2>
                    <p>Average Turnaround Time: {averageTAT.toFixed(2)}</p>
                    <p>Average Waiting Time: {averageWT.toFixed(2)}</p>
                </>
            )}
            {showGanttChart && (
                <>
                    <h2>Gantt Chart</h2>
                    <div className="gantt-chart">
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className="gantt-box"
                                style={{
                                    animation: `moveToPosition 1s ${index * 0.5}s forwards`,
                                }}
                            >
                                <div>Process {result.processNumber}</div>
                                <div>{result.burstTime}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Priority;
