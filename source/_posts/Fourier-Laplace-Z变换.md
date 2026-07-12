---
title: Fourier/Laplace/Z变换
date: 2025-10-15 18:31:53
tags: Signal&System
---
## 信号与系统中的三大变换简单介绍：Fourier, Laplace, Z

在信号处理、控制理论、通信和许多其他工程与科学领域，为了更方便地分析和处理信号与系统，我们常常需要将信号从其自然存在的时域转换到另一个数学上更易于操作的域——频域或复频域。傅里叶变换、拉普拉斯变换和Z变换是实现这种转换的最核心、最强大的数学工具。

-   **傅里叶变换**：处理**稳定**的**连续**时间信号，将其分解为不同频率的正弦波分量。
-   **拉普拉斯变换**：处理**不稳定**或**因果**的**连续**时间信号，是傅里叶变换的推广。
-   **Z变换**：处理**离散**时间信号，是拉普拉斯变换在离散领域的对应物。

---

## 1. 傅里叶变换 (Fourier Transform)

傅里叶变换的核心思想是：任何（行为良好的）信号都可以表示为无穷多个不同频率的正弦和余弦波的叠加。傅里叶变换就是找出这些频率分量的幅度和相位。

### 变换定义

对于一个连续时间信号 $f(t)$，其傅里叶变换 $F(\omega)$ 定义为**分析公式**：
$$ F(\omega) = \mathcal{F}[f(t)] = \int_{-\infty}^{\infty} f(t) e^{-j\omega t} dt $$
其中 $\omega$ 是角频率，$j$ 是虚数单位。$F(\omega)$ 是一个复数函数，包含了信号在频率 $\omega$ 上的幅度和相位信息：$F(\omega) = |F(\omega)|e^{j\phi(\omega)}$。

其逆变换（IFT）定义为**综合公式**，用于从频域表示重构时域信号：
$$ f(t) = \mathcal{F}^{-1}[F(\omega)] = \frac{1}{2\pi} \int_{-\infty}^{\infty} F(\omega) e^{j\omega t} d\omega $$

### 收敛要求 (狄利克雷条件)

为了保证傅里叶变换的积分存在，信号 $f(t)$ 通常需要满足**狄利克雷条件 (Dirichlet Conditions)**，这是一个充分但非必要的条件：
1.  **绝对可积**：信号的总能量是有限的，即 $\int_{-\infty}^{\infty} |f(t)| dt < \infty$。这是最重要的条件。
2.  **有限个极值点**：在任何有限区间内，函数 $f(t)$ 的极大值和极小值的数量是有限的。这排除了具有无限振荡的病态函数。
3.  **有限个间断点**：在任何有限区间内，函数 $f(t)$ 必须是连续的，或只有有限个第一类间断点（即跳变间断）。

### 重要性质

| 性质 | 时域 $f(t)$ | 频域 $F(\omega)$ | 解释与应用 |
| :--- | :--- | :--- | :--- |
| **线性** | $a f_1(t) + b f_2(t)$ | $a F_1(\omega) + b F_2(\omega)$ | 叠加原理在频域同样适用。 |
| **尺度变换** | $f(at)$ | $\frac{1}{\lvert a \rvert} F\left(\frac{\omega}{a}\right)$ | 时域压缩 ($\lvert a \rvert>1$) 导致频域展宽；时域展宽 ($\lvert a \rvert<1$) 导致频域压缩。 |
| **时移** | $f(t - t_0)$ | $e^{-j\omega t_0} F(\omega)$ | 时间上的延迟仅引起一个线性的相位变化，不影响幅度谱。 |
| **频移 (调制)** | $e^{j\omega_0 t} f(t)$ | $F(\omega - \omega_0)$ | 将信号乘以一个复指数（或正弦波），会将其频谱搬移到新的中心频率 $\omega_0$。这是通信中调制的基础。 |
| **时域微分** | $\frac{d^n f(t)}{dt^n}$ | $(j\omega)^n F(\omega)$ | 时域的微分运算在频域变成了简单的乘法运算，极大地简化了微分方程的求解。 |
| **时域积分** | $\int_{-\infty}^{t} f(\tau) d\tau$ | $\frac{1}{j\omega}F(\omega) + \pi F(0)\delta(\omega)$ | 时域积分在频域对应除以 $j\omega$，同时可能在直流分量处产生一个冲激。 |
| **对称性 (对偶性)** | $F(t)$ | $2\pi f(-\omega)$ | 时域和频域的变换形式具有对称性，一个域的性质在另一个域有其对偶性质。 |

### 重要定理

#### 卷积定理 (Convolution Theorem)
这是傅里叶变换在线性系统分析中最核心的定理。它指出，时域的卷积等于频域的乘积。
- **时域卷积**：$y(t) = f_1(t) * f_2(t) = \int_{-\infty}^{\infty} f_1(\tau)f_2(t-\tau)d\tau \quad \Leftrightarrow \quad Y(\omega) = F_1(\omega) F_2(\omega)$
- **应用**：对于一个线性时不变（LTI）系统，如果输入信号是 $x(t)$，系统的冲激响应是 $h(t)$，那么输出信号 $y(t) = x(t) * h(t)$。计算这个卷积积分通常很复杂，但利用卷积定理，我们只需将输入信号和冲激响应的频谱相乘即可得到输出信号的频谱：$Y(\omega) = X(\omega)H(\omega)$。

#### 帕塞瓦尔定理 (Parseval's Theorem)
该定理揭示了信号能量在时域和频域之间的守恒关系。
$$ \int_{-\infty}^{\infty} |f(t)|^2 dt = \frac{1}{2\pi} \int_{-\infty}^{\infty} |F(\omega)|^2 d\omega $$
- **物理意义**：信号在时域的总能量（所有瞬时功率的积分）等于其在频域的总能量（所有频率分量能量的积分，经过一个 $1/2\pi$ 的尺度因子）。$|F(\omega)|^2$ 被称为**能量谱密度**。

### 常见变换对

| 信号 $f(t)$ | 傅里叶变换 $F(\omega)$ |
| :--- | :--- |
| 冲激函数 $\delta(t)$ | $1$ |
| 直流信号 $1$ | $2\pi \delta(\omega)$ |
| 符号函数 $\text{sgn}(t)$ | $\frac{2}{j\omega}$ |
| 阶跃函数 $u(t)$ | $\frac{1}{j\omega} + \pi\delta(\omega)$ |
| 指数衰减 $e^{-at}u(t), (a>0)$ | $\frac{1}{a+j\omega}$ |
| 矩形脉冲 $\text{rect}\left(\frac{t}{T}\right)$ | $T \cdot \text{sinc}\left(\frac{\omega T}{2\pi}\right)$ |
| 三角脉冲 $\text{tri}\left(\frac{t}{T}\right)$ | $\frac{T}{2} \cdot \text{sinc}^2\left(\frac{\omega T}{4\pi}\right)$ |
| 高斯函数 $e^{-at^2}$ | $\sqrt{\frac{\pi}{a}} e^{-\omega^2/(4a)}$ |
| 正弦/余弦 | $\cos(\omega_0 t) \Leftrightarrow \pi[\delta(\omega-\omega_0)+\delta(\omega+\omega_0)]$ |

---

## 2. 拉普拉斯变换 (Laplace Transform)

傅里叶变换要求信号绝对可积，这排除了许多重要的信号（如阶跃函数、斜坡函数、增长的指数函数）。拉普拉斯变换通过引入一个衰减因子 $e^{-\sigma t}$ 来解决这个问题，是傅里叶变换向复频域的推广。

### 变换定义

对于一个连续时间信号 $f(t)$，其（单边）拉普拉斯变换 $F(s)$ 定义为：
$$ F(s) = \mathcal{L}[f(t)] = \int_{0}^{\infty} f(t) e^{-st} dt $$
其中 $s = \sigma + j\omega$ 是一个复变量。衰减因子 $e^{-\sigma t}$ 确保了即使 $f(t)$ 本身不收敛，乘积 $f(t)e^{-\sigma t}$ 也可能收敛。

### 收敛域 (Region of Convergence, ROC)
拉普拉斯变换不是对所有 $s$ 都收敛。使积分收敛的 $s$ 的取值范围称为**收敛域**。ROC是理解信号特性的关键。
- **ROC的性质**：
    1. ROC是复平面上的带状区域，其边界线平行于虚轴。
    2. 对于一个有理的 $F(s)$，ROC内不包含任何极点。
    3. 对于**右边信号**（如因果信号），ROC位于最右边极点的右侧。
    4. 对于**左边信号**，ROC位于最左边极点的左侧。
    5. 对于**双边信号**，ROC是一个带状区域。
- **重要性**：**一个 $F(s)$ 表达式可以对应多个不同的时域信号**，只有结合ROC才能唯一确定一个信号。

### 逆变换

理论上，拉普拉斯逆变换通过**Bromwich积分**计算：
$$ f(t) = \mathcal{L}^{-1}[F(s)] = \frac{1}{2\pi j} \int_{\sigma-j\infty}^{\sigma+j\infty} F(s) e^{st} ds $$
但在实践中，几乎总是使用**部分分式展开 (Partial Fraction Expansion)** 结合查表法来求解。

**部分分式展开示例**：
求 $F(s) = \frac{s+3}{(s+1)(s+2)}$ 的逆变换。
1.  **展开**：$F(s) = \frac{A}{s+1} + \frac{B}{s+2}$
2.  **求系数**：
    - $A = \left. (s+1)F(s) \right|_{s=-1} = \left. \frac{s+3}{s+2} \right|_{s=-1} = \frac{2}{1} = 2$
    - $B = \left. (s+2)F(s) \right|_{s=-2} = \left. \frac{s+3}{s+1} \right|_{s=-2} = \frac{1}{-1} = -1$
3.  **查表**：$F(s) = \frac{2}{s+1} - \frac{1}{s+2}$。根据变换对 $e^{-at}u(t) \Leftrightarrow \frac{1}{s+a}$，得到：
    $$ f(t) = (2e^{-t} - e^{-2t})u(t) $$

### 重要性质

| 性质 | 时域 $f(t)$ | 复频域 $F(s)$ | 解释与应用 |
| :--- | :--- | :--- | :--- |
| **线性** | $a f_1(t) + b f_2(t)$ | $a F_1(s) + b F_2(s)$ | |
| **时移** | $f(t - t_0)u(t-t_0)$ | $e^{-st_0} F(s)$ | |
| **复频移** | $e^{s_0 t} f(t)$ | $F(s - s_0)$ | |
| **时域微分** | $\frac{d f(t)}{dt}$ | $sF(s) - f(0^-)$ | **核心性质**。将时域的微分变成了复频域的乘法，从而将微分方程转化为代数方程，大大简化求解。 |
| **时域积分** | $\int_{0}^{t} f(\tau) d\tau$ | $\frac{1}{s}F(s)$ | 时域积分变为除以 $s$。 |

### 重要定理

#### 卷积定理
与傅里叶变换完全类似，时域卷积对应复频域乘积。
$$ f_1(t) * f_2(t) \quad \Leftrightarrow \quad F_1(s) F_2(s) $$

#### 初值定理 (Initial Value Theorem)
**条件**：$f(t)$ 在 $t=0$ 处没有冲激或更高阶的奇异性。
$$ f(0^+) = \lim_{s \to \infty} sF(s) $$
**应用**：无需逆变换，直接检查系统对输入的瞬时响应。

#### 终值定理 (Final Value Theorem)
**条件**：系统稳定，即 $sF(s)$ 的所有极点都在左半复平面。
$$ \lim_{t \to \infty} f(t) = \lim_{s \to 0} sF(s) $$
**应用**：在控制系统中，用于计算系统的稳态误差。**使用前必须检查稳定性条件**，否则会得出错误结论。

### 常见变换对

| 信号 $f(t)$ | 拉普拉斯变换 $F(s)$ | ROC |
| :--- | :--- | :--- |
| $\delta(t)$ | $1$ | 所有 $s$ |
| $u(t)$ | $\frac{1}{s}$ | $\text{Re}(s) > 0$ |
| $t^n u(t)$ | $\frac{n!}{s^{n+1}}$ | $\text{Re}(s) > 0$ |
| $e^{-at}u(t)$ | $\frac{1}{s+a}$ | $\text{Re}(s) > -a$ |
| $\cos(\omega_0 t)u(t)$ | $\frac{s}{s^2 + \omega_0^2}$ | $\text{Re}(s) > 0$ |
| $\sin(\omega_0 t)u(t)$ | $\frac{\omega_0}{s^2 + \omega_0^2}$ | $\text{Re}(s) > 0$ |
| $e^{-at}\cos(\omega_0 t)u(t)$ | $\frac{s+a}{(s+a)^2 + \omega_0^2}$ | $\text{Re}(s) > -a$ |

---

## 3. Z变换 (Z-Transform)

Z变换是分析**离散时间信号和系统**的数学工具，它在离散时间系统中的地位等同于拉普拉斯变换在连续时间系统中的地位。

### 变换定义

对于一个离散时间序列 $x[n]$，其Z变换 $X(z)$ 定义为：
$$ X(z) = \mathcal{Z}[x[n]] = \sum_{n=-\infty}^{\infty} x[n] z^{-n} $$
其中 $z$ 是一个复变量。可以看作是 $x[n]$ 的每一项都乘以一个复指数序列 $z^{-n}$ 后的求和。

### 收敛域 (ROC)
Z变换的收敛域是Z平面上的一个环形区域。
- **ROC的性质**：
    1. ROC是一个以原点为中心的圆环。
    2. ROC内不包含任何极点。
    3. 对于**右边序列**（如因果序列 $n<0, x[n]=0$），ROC在最外层极点的外部，即 $\lvert z \rvert > \lvert p_{max} \rvert$。
    4. 对于**左边序列**，ROC在最内层非零极点的内部，即 $\lvert z \rvert < \lvert p_{min} \rvert$。
    5. 对于**有限长序列**，ROC是整个Z平面，可能除去 $z=0$ 或 $z=\infty$。

### 逆变换
1.  **围线积分法**：$x[n] = \frac{1}{2\pi j} \oint_C X(z) z^{n-1} dz$。
2.  **长除法**：通过多项式长除法将 $X(z)$ 展开为 $z^{-1}$ 的幂级数，级数的系数就是序列 $x[n]$。适用于求序列的前几项。
3.  **部分分式展开**：最常用、最系统的方法。

**部分分式展开示例**：
求 $X(z) = \frac{1}{(1-0.5z^{-1})(1-0.25z^{-1})}$，ROC: $|z|>0.5$ 的逆变换。
1.  **变换形式**：$X(z) = \frac{z^2}{(z-0.5)(z-0.25)}$。考虑对 $X(z)/z$ 进行展开：
    $\frac{X(z)}{z} = \frac{z}{(z-0.5)(z-0.25)} = \frac{A}{z-0.5} + \frac{B}{z-0.25}$
2.  **求系数**：
    - $A = \left. (z-0.5)\frac{X(z)}{z} \right|_{z=0.5} = \left. \frac{z}{z-0.25} \right|_{z=0.5} = \frac{0.5}{0.25} = 2$
    - $B = \left. (z-0.25)\frac{X(z)}{z} \right|_{z=0.25} = \left. \frac{z}{z-0.5} \right|_{z=0.25} = \frac{0.25}{-0.25} = -1$
3.  **整理并查表**：
    $\frac{X(z)}{z} = \frac{2}{z-0.5} - \frac{1}{z-0.25}$
    $X(z) = \frac{2z}{z-0.5} - \frac{z}{z-0.25}$
    根据变换对 $a^n u[n] \Leftrightarrow \frac{z}{z-a}$，得到：
    $$ x[n] = (2 \cdot (0.5)^n - (0.25)^n) u[n] $$

### 重要性质

| 性质 | 序列 $x[n]$ | Z变换 $X(z)$ | 解释与应用 |
| :--- | :--- | :--- | :--- |
| **线性** | $a x_1[n] + b x_2[n]$ | $a X_1(z) + b X_2(z)$ | |
| **时移** | $x[n - n_0]$ | $z^{-n_0} X(z)$ | **核心性质**。将时域的延迟变成了Z域的乘法，从而将差分方程转化为代数方程。 |
| **Z域尺度变换** | $a^n x[n]$ | $X(a^{-1}z)$ | |
| **时域反转** | $x[-n]$ | $X(z^{-1})$ | |
| **Z域微分** | $n x[n]$ | $-z \frac{d X(z)}{dz}$ | |

### 重要定理

#### 卷积定理
离散时域的卷积对应Z域的乘积。
$$ y[n] = x[n] * h[n] = \sum_{k=-\infty}^{\infty} x[k]h[n-k] \quad \Leftrightarrow \quad Y(z) = X(z)H(z) $$
这是分析离散时间LTI系统的基础。$H(z)$ 称为系统的**传递函数**。

#### 初值定理
对于因果序列（即 $n<0$ 时 $x[n]=0$）：
$$ x[0] = \lim_{z \to \infty} X(z) $$

#### 终值定理
对于因果序列，**条件**是 $(z-1)X(z)$ 的所有极点都在单位圆内部。
$$ \lim_{n \to \infty} x[n] = \lim_{z \to 1} (z-1)X(z) $$

### 常见变换对

| 序列 $x[n]$ | Z变换 $X(z)$ | ROC |
| :--- | :--- | :--- |
| $\delta[n]$ | $1$ | 所有 $z$ |
| $u[n]$ | $\frac{z}{z-1}$ | $\lvert z \rvert > 1$ |
| $a^n u[n]$ | $\frac{z}{z-a}$ | $\lvert z \rvert > \lvert a \rvert$ |
| $n u[n]$ | $\frac{z}{(z-1)^2}$ | $\lvert z \rvert > 1$ |
| $n a^n u[n]$ | $\frac{az}{(z-a)^2}$ | $\lvert z \rvert > \lvert a \rvert$ |
| $\cos(\omega_0 n)u[n]$ | $\frac{z(z-\cos(\omega_0))}{z^2-2z\cos(\omega_0)+1}$ | $\lvert z \rvert > 1$ |
| $\sin(\omega_0 n)u[n]$ | $\frac{z\sin(\omega_0)}{z^2-2z\cos(\omega_0)+1}$ | $\lvert z \rvert > 1$ |

---
