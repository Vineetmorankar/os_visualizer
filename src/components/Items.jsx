import React from 'react';
import './Items.css';

const Items = () => {
  return (
    <div className="itemsContainer">
      <div className="item">
        <a href="/Fcfs" className="title-link"><h2>FCFS (First-Come, First-Served)</h2></a>
        <p>The full form of FCFS Scheduling is First Come First Serve Scheduling. FCFS Scheduling algorithm automatically executes the queued processes and requests in the order of their arrival. It allocates the job that first arrived in the queue to the CPU, then allocates the second one, and so on. FCFS is the simplest and easiest CPU scheduling algorithm, managed with a FIFO queue. FIFO stands for First In First Out. The FCFS scheduling algorithm places the arriving processes/jobs at the very end of the queue. So, the processes that request the CPU first get the allocation from the CPU first. As any process enters the FIFO queue, its Process Control Block (PCB) gets linked with the queue’s tail. As the CPU becomes free, the process at the very beginning gets assigned to it. Even if the CPU starts working on a longer job, many shorter ones have to wait after it. The FCFS scheduling algorithm works in most of the batches of operating systems.</p>
      </div>
      <div className="item">
        <a href="/Sjf" className="title-link"><h2>SJF (Shortest Job First)</h2></a>
        <p>An Operating System uses a variety of algorithms to efficiently arrange the operations for the processor, Shortest Job First (SJF) algorithm is one of them. In the Shortest Job First algorithm, the CPU will be assigned a job with the smallest burst time first, and the processes in the queue with the shorter burst time will be received and executed by the CPU more quickly. We'll discuss an in-depth explanation of the SJF scheduling algorithm with examples in the below article.</p>
      </div>
      <div className="item">
        <a href="/Priority" className="title-link"><h2>Priority Scheduling</h2></a>
        <p>Priority scheduling is a non-preemptive algorithm and one of the most common scheduling algorithms in batch systems. Each process is assigned first arrival time (less arrival time process first) if two processes have same arrival time, then compare to priorities (highest process first). Also, if two processes have same priority then compare to process number (less process number first). This process is repeated while all process get executed.</p>
      </div>
      <div className="item">
        <a href="/RoundRobin" className="title-link"><h2>Round Robin</h2></a>
        <p>Round-robin (RR) is one of the algorithms employed by process and network schedulers in computing. As the term is generally used, time slices (also known as time quanta) are assigned to each process in equal portions and in circular order, handling all processes without priority (also known as cyclic executive). Round-robin scheduling is simple, easy to implement, and starvation-free. Round-robin scheduling can be applied to other scheduling problems, such as data packet scheduling in computer networks. It is an operating system concept. The name of the algorithm comes from the round-robin principle known from other fields, where each person takes an equal share of something in turn.</p>
      </div>
    </div>
  );
};

export default Items;
