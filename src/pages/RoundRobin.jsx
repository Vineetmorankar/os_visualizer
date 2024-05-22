

import React, { useState } from 'react';
import './FCFS.css'; // Make sure to create a corresponding CSS file

const RoundRobin = () => {
    const [processes, setProcesses] = useState([]);
    const [results, setResults] = useState([]);
    const [ganttChart, setGanttChart] = useState([]);
    const [timeQuantum, setTimeQuantum] = useState('');
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
        setProcesses([...processes, { processNumber: '', arrivalTime: '', burstTime: '' }]);
    };

    const deleteProcess = (index) => {
        const newProcesses = processes.filter((_, i) => i !== index);
        setProcesses(newProcesses);
    };

    const calculateRoundRobin = () => {
        const tq = parseInt(timeQuantum);
        let table = processes.map((process) => ({
            ...process,
            remainingTime: parseInt(process.burstTime),
            completionTime: 0,
            turnaroundTime: 0,
            waitingTime: 0,
        }));

        // Sort processes by arrival time
        table.sort((a, b) => parseInt(a.arrivalTime) - parseInt(b.arrivalTime));

        let time = 0;
        let totalTAT = 0;
        let totalWT = 0;
        let queue = [];
        let ganttChartTemp = [];
        let resultTable = [];

        // Initialize the ready queue with processes that have arrived at time 0
        queue = table.filter(p => p.arrivalTime <= time);
        table = table.filter(p => p.arrivalTime > time);

        while (queue.length > 0) {
            let process = queue.shift();

            if (process.remainingTime > tq) {
                time += tq;
                process.remainingTime -= tq;
                ganttChartTemp.push({ processNumber: process.processNumber, duration: tq });

                // Add newly arrived processes to the queue
                let arrivedProcesses = table.filter(p => p.arrivalTime <= time);
                queue.push(...arrivedProcesses);
                table = table.filter(p => p.arrivalTime > time);

                queue.push(process); // Re-add the current process to the queue

            } else {
                time += process.remainingTime;
                ganttChartTemp.push({ processNumber: process.processNumber, duration: process.remainingTime });
                process.remainingTime = 0;
                process.completionTime = time;
                process.turnaroundTime = process.completionTime - parseInt(process.arrivalTime);
                process.waitingTime = process.turnaroundTime - parseInt(process.burstTime);

                totalTAT += process.turnaroundTime;
                totalWT += process.waitingTime;

                resultTable.push(process);

                // Add newly arrived processes to the queue
                let arrivedProcesses = table.filter(p => p.arrivalTime <= time);
                queue.push(...arrivedProcesses);
                table = table.filter(p => p.arrivalTime > time);
            }
        }

        setResults(resultTable);
        setGanttChart(ganttChartTemp);
        setAverageTAT(totalTAT / processes.length);
        setAverageWT(totalWT / processes.length);
        setProcesses(processes.map(p => ({ ...p }))); // To trigger re-rendering
    };

    return (
        <div className="fcfs-container">
            <h1>Round Robin Scheduling Algorithm</h1>
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
                            <td><button onClick={() => deleteProcess(index)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="input-container">
                <div>
                    <label>Time Quantum: </label>
                    <input
                        type="number"
                        value={timeQuantum}
                        onChange={(e) => setTimeQuantum(e.target.value)}
                    />
                </div>
            </div>
            <div className="button-container">
                <button onClick={() => { calculateRoundRobin(); setShowResults(true); setShowAverageTimes(false); setShowGanttChart(false); }}>Show Result Table</button>
                <button onClick={() => { calculateRoundRobin(); setShowAverageTimes(true); setShowResults(false); setShowGanttChart(false); }}>Show Avg TAT & WT</button>
                <button onClick={() => { calculateRoundRobin(); setShowGanttChart(true); setShowResults(false); setShowAverageTimes(false); }}>Show Gantt Chart</button>
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
                                <th>Completion Time</th>
                                <th>Turnaround Time</th>
                                <th>Waiting Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results
                                .slice()
                                .sort((a, b) => parseInt(a.processNumber) - parseInt(b.processNumber))
                                .map((process, index) => (
                                    <tr key={index}>
                                        <td>{process.processNumber}</td>
                                        <td>{process.arrivalTime}</td>
                                        <td>{process.burstTime}</td>
                                        <td>{process.completionTime}</td>
                                        <td>{process.turnaroundTime}</td>
                                        <td>{process.waitingTime}</td>
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
                        {ganttChart.map((result, index) => (
                            <div
                                key={index}
                                className="gantt-box"
                                style={{
                                    animation: `moveToPosition 1s ${index * 0.5}s forwards`,
                                }}
                            >
                                <div>Process {result.processNumber}</div>
                                <div>{result.duration}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default RoundRobin;
