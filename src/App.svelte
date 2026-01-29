<script>
    import { onMount } from "svelte";
    import { checkDailyReset } from "./stores/habits.js";
    import Header from "./components/Header.svelte";
    import AddHabit from "./components/AddHabit.svelte";
    import HabitList from "./components/HabitList.svelte";
    import "./app.css";

    onMount(() => {
        checkDailyReset();
    });
    let Token = "";

    //authentecation
    let tokenAfterFitching = $state();
     let getauthcode = () => {
        my.getAuthCode({
            scopes: ["auth_base", "USER_ID"],
            success: (res) => {
                Token = res.authCode;
                fetch("https://its.mouamle.space/api/auth-with-superQi", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: Token,
                    }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        tokenAfterFitching = data.token;
                        my.alert({
                            content: "Login successful",
                        });
                        // save token in local storage to keep user logged in
                        localStorage.setItem("token", tokenAfterFitching);
                    })
                    .catch((err) => {
                        my.alert({
                            content: "Login failed" + err,
                        });
                    });
            },
        });
    };

    // payment
    function handlePay() {
        fetch("https://its.mouamle.space/api/payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                my.tradePay({
                    paymentUrl: data.url,
                    success: (res) => {
                        qi.showToast({
                            content: "Payment successful",
                            type: "success",
                        });
                    },
                    fail: (err) => {
                        qi.showToast({
                            content:
                                "Payment failed trade" + JSON.stringify(err),
                            type: "none",
                        });
                    },
                });
            })
            .catch((err) => {
                qi.showToast({
                    content: "Payment failed" + err,
                });
            });
    }
</script>

<main class="container">
    <Header />
    <AddHabit />
    <HabitList />

    <div class="actions-wrapper">
        <button class="modern-btn login-btn" on:click={AuthMethod}>
            <span>Login</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
                ></path><polyline points="10 17 15 12 10 7"></polyline><line
                    x1="15"
                    y1="12"
                    x2="3"
                    y2="12"
                ></line></svg
            >
        </button>
        <button class="modern-btn pay-btn" on:click={handlePay}>
            <span>Pay Now</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><rect x="1" y="4" width="22" height="16" rx="2" ry="2"
                ></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg
            >
        </button>
    </div>

    <!-- Hidden element required by AuthMethod to prevent errors -->
    <div id="AuthCode" class="status-text"></div>
</main>

<style>
    /* Global refined reset for this component context */
    :global(body) {
        margin: 0;
        font-family:
            "Inter",
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            sans-serif;
        background-color: #f8f9fa;
    }

    .container {
        padding: 24px 16px;
        max-width: 480px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 24px;
        min-height: 100vh;
    }

    .actions-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-top: 32px;
        padding-top: 24px;
        border-top: 1px solid #eaeaea;
    }

    .modern-btn {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 14px 20px;
        border: none;
        border-radius: 16px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        color: white;
    }

    /* Microinteractions: Hover & Active States */
    .modern-btn:hover {
        transform: translateY(-3px);
        filter: brightness(1.1);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }

    .modern-btn:active {
        transform: translateY(1px) scale(0.98);
        filter: brightness(0.95);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    /* Login Button - Blue/Purple Gradient */
    .login-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        box-shadow: 0 4px 15px rgba(118, 75, 162, 0.35);
    }

    .login-btn:hover {
        box-shadow: 0 8px 25px rgba(118, 75, 162, 0.45);
    }

    /* Pay Button - Green/Teal Gradient */
    .pay-btn {
        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
        box-shadow: 0 4px 15px rgba(17, 153, 142, 0.35);
    }

    .pay-btn:hover {
        box-shadow: 0 8px 25px rgba(17, 153, 142, 0.45);
    }

    .status-text {
        font-size: 12px;
        color: #888;
        text-align: center;
        margin-top: 8px;
        word-break: break-all;
        min-height: 20px;
        font-family: monospace;
    }

    /* Responsive adjustments */
    @media (max-width: 350px) {
        .actions-wrapper {
            grid-template-columns: 1fr;
        }
    }
</style>
