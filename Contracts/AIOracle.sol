// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title AIOracle
 * @dev Oracle contract for AI-powered price predictions and market insights
 * Stores and provides access to AI-generated market data
 */
contract AIOracle is Ownable, ReentrancyGuard {
    struct PricePrediction {
        uint256 price;           // Predicted price in USD (with 8 decimals)
        uint256 confidence;      // Confidence score (0-100)
        uint256 timestamp;       // Prediction timestamp
        address predictor;       // AI predictor address
        bool isActive;          // Whether prediction is still valid
    }

    struct MarketInsight {
        string symbol;           // Token symbol (e.g., "ETH", "BTC")
        string insight;          // AI-generated insight text
        uint256 sentiment;       // Sentiment score (-100 to 100)
        uint256 timestamp;       // Insight timestamp
        uint256 riskLevel;       // Risk level (1-5, 5 being highest risk)
        bool isActive;          // Whether insight is still valid
    }

    struct TradingSignal {
        string symbol;           // Token symbol
        uint8 signalType;        // 1=BUY, 2=SELL, 3=HOLD
        uint256 strength;        // Signal strength (0-100)
        uint256 priceTarget;     // Target price
        uint256 stopLoss;        // Stop loss price
        uint256 timestamp;       // Signal timestamp
        address predictor;       // AI predictor address
        bool isActive;          // Whether signal is still valid
    }

    // Storage
    mapping(string => PricePrediction[]) public pricePredictions;
    mapping(string => MarketInsight[]) public marketInsights;
    mapping(string => TradingSignal[]) public tradingSignals;

    // Authorized predictors (AI services)
    mapping(address => bool) public authorizedPredictors;
    mapping(address => string) public predictorNames;

    // Events
    event PricePredictionAdded(string indexed symbol, uint256 price, uint256 confidence);
    event MarketInsightAdded(string indexed symbol, uint256 sentiment, uint256 riskLevel);
    event TradingSignalAdded(string indexed symbol, uint8 signalType, uint256 strength);
    event PredictorAuthorized(address indexed predictor, string name);
    event PredictorRevoked(address indexed predictor);

    modifier onlyAuthorizedPredictor() {
        require(authorizedPredictors[msg.sender], "Not authorized predictor");
        _;
    }

    constructor() {
        // Authorize deployer as initial predictor
        authorizedPredictors[msg.sender] = true;
        predictorNames[msg.sender] = "Deployer";
    }

    /**
     * @dev Authorize a new AI predictor
     * @param predictor Address of the predictor
     * @param name Name of the predictor service
     */
    function authorizePredictor(address predictor, string memory name) external onlyOwner {
        require(predictor != address(0), "Invalid predictor address");
        require(!authorizedPredictors[predictor], "Predictor already authorized");

        authorizedPredictors[predictor] = true;
        predictorNames[predictor] = name;

        emit PredictorAuthorized(predictor, name);
    }

    /**
     * @dev Revoke predictor authorization
     * @param predictor Address of the predictor to revoke
     */
    function revokePredictor(address predictor) external onlyOwner {
        require(authorizedPredictors[predictor], "Predictor not authorized");

        authorizedPredictors[predictor] = false;
        delete predictorNames[predictor];

        emit PredictorRevoked(predictor);
    }

    /**
     * @dev Add price prediction (only authorized predictors)
     * @param symbol Token symbol
     * @param price Predicted price (8 decimals)
     * @param confidence Confidence score (0-100)
     */
    function addPricePrediction(
        string memory symbol,
        uint256 price,
        uint256 confidence
    ) external onlyAuthorizedPredictor {
        require(price > 0, "Invalid price");
        require(confidence <= 100, "Invalid confidence");

        PricePrediction memory prediction = PricePrediction({
            price: price,
            confidence: confidence,
            timestamp: block.timestamp,
            predictor: msg.sender,
            isActive: true
        });

        pricePredictions[symbol].push(prediction);

        emit PricePredictionAdded(symbol, price, confidence);
    }

    /**
     * @dev Add market insight (only authorized predictors)
     * @param symbol Token symbol
     * @param insight Insight text
     * @param sentiment Sentiment score (-100 to 100)
     * @param riskLevel Risk level (1-5)
     */
    function addMarketInsight(
        string memory symbol,
        string memory insight,
        int256 sentiment,
        uint256 riskLevel
    ) external onlyAuthorizedPredictor {
        require(bytes(insight).length > 0, "Empty insight");
        require(sentiment >= -100 && sentiment <= 100, "Invalid sentiment");
        require(riskLevel >= 1 && riskLevel <= 5, "Invalid risk level");

        MarketInsight memory marketInsight = MarketInsight({
            symbol: symbol,
            insight: insight,
            sentiment: uint256(sentiment),
            timestamp: block.timestamp,
            riskLevel: riskLevel,
            isActive: true
        });

        marketInsights[symbol].push(marketInsight);

        emit MarketInsightAdded(symbol, uint256(sentiment), riskLevel);
    }

    /**
     * @dev Add trading signal (only authorized predictors)
     * @param symbol Token symbol
     * @param signalType Signal type (1=BUY, 2=SELL, 3=HOLD)
     * @param strength Signal strength (0-100)
     * @param priceTarget Target price
     * @param stopLoss Stop loss price
     */
    function addTradingSignal(
        string memory symbol,
        uint8 signalType,
        uint256 strength,
        uint256 priceTarget,
        uint256 stopLoss
    ) external onlyAuthorizedPredictor {
        require(signalType >= 1 && signalType <= 3, "Invalid signal type");
        require(strength <= 100, "Invalid strength");

        TradingSignal memory signal = TradingSignal({
            symbol: symbol,
            signalType: signalType,
            strength: strength,
            priceTarget: priceTarget,
            stopLoss: stopLoss,
            timestamp: block.timestamp,
            predictor: msg.sender,
            isActive: true
        });

        tradingSignals[symbol].push(signal);

        emit TradingSignalAdded(symbol, signalType, strength);
    }

    /**
     * @dev Get latest price prediction for a symbol
     * @param symbol Token symbol
     * @return price Predicted price
     * @return confidence Confidence score
     * @return timestamp Prediction timestamp
     */
    function getLatestPricePrediction(string memory symbol)
        external
        view
        returns (uint256 price, uint256 confidence, uint256 timestamp)
    {
        PricePrediction[] storage predictions = pricePredictions[symbol];
        require(predictions.length > 0, "No predictions available");

        // Return the latest active prediction
        for (uint256 i = predictions.length; i > 0; i--) {
            if (predictions[i-1].isActive) {
                PricePrediction storage prediction = predictions[i-1];
                return (prediction.price, prediction.confidence, prediction.timestamp);
            }
        }

        revert("No active predictions");
    }

    /**
     * @dev Get latest market insight for a symbol
     * @param symbol Token symbol
     * @return insight Insight text
     * @return sentiment Sentiment score
     * @return riskLevel Risk level
     * @return timestamp Insight timestamp
     */
    function getLatestMarketInsight(string memory symbol)
        external
        view
        returns (string memory insight, uint256 sentiment, uint256 riskLevel, uint256 timestamp)
    {
        MarketInsight[] storage insights = marketInsights[symbol];
        require(insights.length > 0, "No insights available");

        // Return the latest active insight
        for (uint256 i = insights.length; i > 0; i--) {
            if (insights[i-1].isActive) {
                MarketInsight storage marketInsight = insights[i-1];
                return (
                    marketInsight.insight,
                    marketInsight.sentiment,
                    marketInsight.riskLevel,
                    marketInsight.timestamp
                );
            }
        }

        revert("No active insights");
    }

    /**
     * @dev Get latest trading signal for a symbol
     * @param symbol Token symbol
     * @return signalType Signal type
     * @return strength Signal strength
     * @return priceTarget Target price
     * @return stopLoss Stop loss price
     * @return timestamp Signal timestamp
     */
    function getLatestTradingSignal(string memory symbol)
        external
        view
        returns (uint8 signalType, uint256 strength, uint256 priceTarget, uint256 stopLoss, uint256 timestamp)
    {
        TradingSignal[] storage signals = tradingSignals[symbol];
        require(signals.length > 0, "No signals available");

        // Return the latest active signal
        for (uint256 i = signals.length; i > 0; i--) {
            if (signals[i-1].isActive) {
                TradingSignal storage signal = signals[i-1];
                return (
                    signal.signalType,
                    signal.strength,
                    signal.priceTarget,
                    signal.stopLoss,
                    signal.timestamp
                );
            }
        }

        revert("No active signals");
    }

    /**
     * @dev Get prediction count for a symbol
     * @param symbol Token symbol
     * @return Count of predictions
     */
    function getPredictionCount(string memory symbol) external view returns (uint256) {
        return pricePredictions[symbol].length;
    }

    /**
     * @dev Get insight count for a symbol
     * @param symbol Token symbol
     * @return Count of insights
     */
    function getInsightCount(string memory symbol) external view returns (uint256) {
        return marketInsights[symbol].length;
    }

    /**
     * @dev Get signal count for a symbol
     * @param symbol Token symbol
     * @return Count of signals
     */
    function getSignalCount(string memory symbol) external view returns (uint256) {
        return tradingSignals[symbol].length;
    }

    /**
     * @dev Deactivate old predictions (only owner)
     * @param symbol Token symbol
     * @param maxAge Maximum age in seconds
     */
    function deactivateOldPredictions(string memory symbol, uint256 maxAge) external onlyOwner {
        PricePrediction[] storage predictions = pricePredictions[symbol];
        uint256 cutoffTime = block.timestamp - maxAge;

        for (uint256 i = 0; i < predictions.length; i++) {
            if (predictions[i].timestamp < cutoffTime && predictions[i].isActive) {
                predictions[i].isActive = false;
            }
        }
    }

    /**
     * @dev Emergency stop all predictions for a symbol (only owner)
     * @param symbol Token symbol
     */
    function emergencyStopPredictions(string memory symbol) external onlyOwner {
        PricePrediction[] storage predictions = pricePredictions[symbol];
        for (uint256 i = 0; i < predictions.length; i++) {
            predictions[i].isActive = false;
        }

        MarketInsight[] storage insights = marketInsights[symbol];
        for (uint256 i = 0; i < insights.length; i++) {
            insights[i].isActive = false;
        }

        TradingSignal[] storage signals = tradingSignals[symbol];
        for (uint256 i = 0; i < signals.length; i++) {
            signals[i].isActive = false;
        }
    }
}