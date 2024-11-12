# Technique: Switch Debounce using the CLB

## Overview

A debounce/glitch filter is a crucial component in digital circuits involving push buttons. Mechanical push buttons often produce input noise, known as 'bounces,' due to their physical construction. When pressed, the two physical terminals inside the button/switch come into contact, but this contact is often neither instantaneous nor smooth. This causes multiple signal fluctuations as the terminals settle into a stable state.

These bounces can lead to erratic behavior in digital systems, as the microcontroller or processor might interpret each bounce as a separate press. Additionally, electrical noise or interference can cause unwanted pulses, known as glitches, further disrupting signal integrity.

**Debounce and glitch filters** are used to ensure that only clean, stable signals are registered, improving the reliability and performance of the system. By leveraging the **Configurable Logic Block (CLB)** peripheral, a robust switch debounce solution can be implemented. The CLB's integrated logic capabilities allow for the creation of a custom hardware-based debounce solution that efficiently stabilizes signals without additional CPU load or external components.

---

## Requirements

- **CLB Peripheral**

---

## Block Diagram

*Include your block diagram here, e.g., `block_diagram.png`:*
```markdown
![Block Diagram](block_diagram.png)
```

---

## Steps

### 1. Set Up Your Project
- Create a new project in your development environment.
- Enable the **Configurable Logic Block (CLB)** peripheral.

### 2. Design the Logic
- Configure the CLB to implement flip-flops, OR gates, or equivalent logic for the debounce/glitch filter.
- Refer to the **Block Diagram** section for guidance.
- If using **MPLAB Code Configurator (MCC)**, use the CLB Synthesizer tool or download the pre-configured CLB file.

### 3. Select a Clock Source
- Configure the CLB clock to sample the input signal at intervals that allow bounces to settle (10–50 ms range) while maintaining responsiveness.
- A slower clock ensures only stable input changes are registered, but avoid making it too slow to prevent delayed detection.

### 4. Connect Signals in the CLB
- Assign the **input pin** to the switch and route the output through the CLB to deliver a debounced signal.

### 5. Verify the Design
- Use a debugging tool to confirm that the debounce functionality works as expected.

---

## Results

The image below illustrates the **raw signal** of a push button being pressed (with the expected noise from bouncing, marked by green arrows) and the **filtered signal**. 

By using a combination of flip-flops and OR gates, the debounce filter captures the noisy signal from the button press at regular intervals, smoothing out fluctuations over time to provide an accurate and stable representation of the button press.

*Include your results image here, e.g., `results.png`:*
```markdown
![Filtered Signal Example](results.png)
```

---

## Applicable Links

- [Find a Part](#)
- [CLB Peripheral Page](#)
- [More CLB Examples](#)
