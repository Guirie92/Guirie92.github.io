// code-snippets.js
var codeSnippets = {
    'NetworkStringArray':  // 1
        `public struct NetworkStringArray : INetworkSerializable
{
    public string[] Array;

    public void NetworkSerialize&lt;T&gt;(BufferSerializer&lt;T&gt; serializer) where T : IReaderWriter
    {
        var length = 0;
        if (!serializer.IsReader)
            length = Array.Length;
 
         serializer.SerializeValue(ref length);
 
         if (serializer.IsReader)
             Array = new string[length];
 
         for (var n = 0; n < length; ++n)
             serializer.SerializeValue(ref Array[n]);
     }
 }
`,
    'AnotherSnippet': // 2
        `function anotherExample() {
    // ... some other code ...
}
`,

    'RPCs': // 3
        `[ServerRpc(RequireOwnership = false)]
 public void Fold_ServerRpc()
 {
     buttonsCanvas.enabled = false;
     Fold_ClientRpc();
 }

 [ClientRpc]
 public void Fold_ClientRpc()
 {
     if (!_gameDataSO.foldPlayersArray[_gameDataSO.playerTurn])
     {
         _gameDataSO.foldPlayersArray[_gameDataSO.playerTurn] = true;
         playerBoxShadowArray[_gameDataSO.playerTurn].enabled = true;
         _eventHandlerSO.RaiseAudioCueEvent(_sfxDataSO.FoldSFX, 3f);
     }
 }
`,

    'RPCs1': // 4
        `[ServerRpc(RequireOwnership = false)]
`,

    'SimpleNetworkTransfer': // 5
        `// (Here, players hook up to the events in Awake to ensure they're set before the game starts)
private void Awake()
{
    // Load shared game data resources
    _eventHandlerSO = (EventHandlerSO)Resources.Load("EventHandlerSO");
    // ... (others SOs)

    // Clear player IDs on network shutdown
    _eventHandlerSO.OnNetworkShutdown += ClearPlayerIDs;
    // Set up initial game parameters for clients
    _eventHandlerSO.OnSetupParametersRequested += SetupParameters_ClientRpc;
    // Start game setup for clients
    _eventHandlerSO.OnStartSetupEventRequested += StartSetup_ClientRpc;
    // ... (other event subscriptions)
}

// Cleanup of client parameters and subscriptions.
private void OnDestroy()
{
    // Proper cleanup of the Network Callbacks
    RemoveNetworkManagerCallbacks();

    _eventHandlerSO.OnNetworkShutdown -= ClearPlayerIDs;
    _eventHandlerSO.OnSetupParametersRequested -= SetupParameters_ClientRpc;
    _eventHandlerSO.OnStartSetupEventRequested -= StartSetup_ClientRpc;
    // ... (other event unsubscriptions)
}

// ...

// (A simple transfer could be done directly like this)
[ClientRpc]
private void SetupParameters_ClientRpc(int numberOfPlayers, int numberOfChipsPerPlayer,
    int bigBlindValue, int blindTimerMinutes, int blindTimerSeconds, int timeBankValue,
    float turnSecondsValue)
{
    _gameDataSO.numberOfPlayers = numberOfPlayers;
    _gameDataSO.tournamentPlayers = numberOfPlayers;
    _gameDataSO.numberOfChipsPerPlayer = numberOfChipsPerPlayer;
    _gameDataSO.bigBlindValue = bigBlindValue;
    _gameDataSO.blindTimerMinutes = blindTimerMinutes;
    _gameDataSO.blindTimerSeconds = blindTimerSeconds;
    _gameDataSO.timeBankValue = timeBankValue;
    _gameDataSO.turnSecondsValue = turnSecondsValue;
    ProvideName_ServerRpc((_gameDataSO.networkPlayerID - 1), MenuPrefs.LocalPlayerName);
}
`,

    'SimpleGameStats': // 6
        `// Struct for serializing Game Stats for simple data types
public struct GameStats : INetworkSerializable
{
    [Header("Tournament_Parameters")]
    public int tournamentPlayers;
    public int numberOfPlayers;
    // ... (other tournament parameters)

    [Header("Canvas_Group")]
    public float textFadeInAndOutValue;
    public bool turnCoroutine;
    // ... (other UI parameters)

    // ... (other parameters)

    // INetworkSerializable to convert struct fields into a network-friendly format
    public void NetworkSerialize&lt;T&gt;(BufferSerializer&lt;T&gt; serializer) where T : IReaderWriter
    {
        // Each field is serialized individually to ensure it is correctly handled over the network.
        serializer.SerializeValue(ref tournamentPlayers);
        serializer.SerializeValue(ref numberOfPlayers);
        // ...
        serializer.SerializeValue(ref textFadeInAndOutValue);
        serializer.SerializeValue(ref turnCoroutine);
        // ...
    }
}
`,

    'ArrayGameStats': // 7
        `// Struct for serializing arrays containing game state information
public struct GameStats_Arrays : INetworkSerializable
{
    // We expose arrays to store game-related data.
    public Vector3[] customBetPositionArray;
    public int[] playerStackArray;
    public int[] playerRoundEarningsArray;
    public int[] betPlayerArray;
    public bool[] tiedPlayersArray;
    public bool[] foldPlayersArray;
    public int[] chipsPerPlayerAmount;
    public int[] minValueArray;
    public int[] listOfPlayersInTurn;
    public int[] listOfIDs;
    public FixedString64Bytes[] playerNameArray;

    // Function to serialize/deserialize arrays depending on the context (writing/reading)
    public void NetworkSerialize&lt;T&gt;(BufferSerializer&lt;T&gt; serializer) where T : IReaderWriter
    {
        // Here, we initialize the values for the length of the arrays to 0 (later we'll update these values).
        int playerStackArrayLength = 0;
        int playerRoundEarningsArrayLength = 0;
        int betPlayerArrayLength = 0;
        int tiedPlayersArrayLength = 0;
        int foldPlayersArrayLength = 0;
        int chipsPerPlayerAmountLength = 0;
        int minValueArrayLength = 0;
        int listOfPlayersInTurnLength = 0;
        int listOfIDsLength = 0;
        int playerNameArrayLength = 0;

        // When writing, we only serialize the length. When reading, we allocate the arrays accordingly.
        if (!serializer.IsReader)
        {
            playerStackArrayLength = playerStackArray.Length;
            playerRoundEarningsArrayLength = playerRoundEarningsArray.Length;
            betPlayerArrayLength = betPlayerArray.Length;
            tiedPlayersArrayLength = tiedPlayersArray.Length;
            foldPlayersArrayLength = foldPlayersArray.Length;
            chipsPerPlayerAmountLength = chipsPerPlayerAmount.Length;
            minValueArrayLength = minValueArray.Length;
            listOfPlayersInTurnLength = listOfPlayersInTurn.Length;
            listOfIDsLength = listOfIDs.Length;
            playerNameArrayLength = playerNameArray.Length;
        }
        serializer.SerializeValue(ref playerStackArrayLength);
        serializer.SerializeValue(ref playerRoundEarningsArrayLength);
        serializer.SerializeValue(ref betPlayerArrayLength);
        serializer.SerializeValue(ref tiedPlayersArrayLength);
        serializer.SerializeValue(ref foldPlayersArrayLength);
        serializer.SerializeValue(ref chipsPerPlayerAmountLength);
        serializer.SerializeValue(ref minValueArrayLength);
        serializer.SerializeValue(ref listOfPlayersInTurnLength);
        serializer.SerializeValue(ref listOfIDsLength);
        serializer.SerializeValue(ref playerNameArrayLength);

        // Here, when the serializer is in 'reader' mode, we prepare to read the incoming data.
        if (serializer.IsReader)
        {
            playerStackArray = new int[playerStackArrayLength];
            playerRoundEarningsArray = new int[playerRoundEarningsArrayLength];
            betPlayerArray = new int[betPlayerArrayLength];
            tiedPlayersArray = new bool[tiedPlayersArrayLength];
            foldPlayersArray = new bool[foldPlayersArrayLength];
            chipsPerPlayerAmount = new int[chipsPerPlayerAmountLength];
            minValueArray = new int[minValueArrayLength];
            listOfPlayersInTurn = new int[listOfPlayersInTurnLength];
            listOfIDs = new int[listOfIDsLength];
            playerNameArray = new FixedString64Bytes[playerNameArrayLength];

        }

        // Serialize or deserialize each element of the arrays depending on the serializer mode
        for (int n = 0; n < playerStackArrayLength; ++n)
        {
            serializer.SerializeValue(ref playerStackArray[n]);
        }
        for (int n = 0; n < playerRoundEarningsArrayLength; ++n)
        {
            serializer.SerializeValue(ref playerRoundEarningsArray[n]);
        }
        for (int n = 0; n < betPlayerArrayLength; ++n)
        {
            serializer.SerializeValue(ref betPlayerArray[n]);
        }
        for (int n = 0; n < tiedPlayersArrayLength; ++n)
        {
            serializer.SerializeValue(ref tiedPlayersArray[n]);
        }
        for (int n = 0; n < foldPlayersArrayLength; ++n)
        {
            serializer.SerializeValue(ref foldPlayersArray[n]);
        }
        for (int n = 0; n < chipsPerPlayerAmountLength; ++n)
        {
            serializer.SerializeValue(ref chipsPerPlayerAmount[n]);
        }
        for (int n = 0; n < minValueArrayLength; ++n)
        {
            serializer.SerializeValue(ref minValueArray[n]);
        }
        for (int n = 0; n < listOfPlayersInTurnLength; ++n)
        {
            serializer.SerializeValue(ref listOfPlayersInTurn[n]);
        }
        for (int n = 0; n < listOfIDsLength; ++n)
        {
            serializer.SerializeValue(ref listOfIDs[n]);
        }
        for (int n = 0; n < playerNameArrayLength; ++n)
        {
            serializer.SerializeValue(ref playerNameArray[n]);
        }
    }
}
`,

    'ServerSideNetworkUpdate': // 8
        `// Server-side RPC to update game variables for a specific client, allowing re-synchronization upon reconnection.
[ServerRpc(RequireOwnership = false)]
private void UpdateNetworkVariables_ServerRpc(ulong clientId)
{
    // Initialize struct to hold updated Game Stats
    GameStats updatedGameStats = new GameStats { };

    // Assign current game data to the struct
    updatedGameStats.tournamentPlayers = _gameDataSO.tournamentPlayers;
    updatedGameStats.numberOfPlayers = _gameDataSO.numberOfPlayers;
    // ... (other simple data assignments)


    // Initialize struct for Array-Type Game Stats
    GameStats_Arrays updatedGameStats_Arrays = new GameStats_Arrays { };

    // Copy current array data into the struct
    updatedGameStats_Arrays.playerStackArray = new int[_gameDataSO.playerStackArray.Length];
    updatedGameStats_Arrays.playerRoundEarningsArray = new int[_gameDataSO.playerRoundEarningsArray.Length];
    // ... (other array assignments)

    // Populate arrays with current game data
    for (int i = 0; i < _gameDataSO.currentPlayers.Length; i++)
    {
        updatedGameStats_Arrays.playerStackArray[i] = _gameDataSO.playerStackArray[i];

        // ... (the rest of the updates)
    }
    

    // Here we do the same with all Data Types.

    // Setting up targeted client RPC call parameters
    _singleTarget[0] = clientId;
    ClientRpcParams clientRpcParams = default;
    clientRpcParams.Send.TargetClientIds = _singleTarget;

    // Call client-side RPC to update game variables for the reconnecting client 
    UpdateNetworkVariables_ClientRpc(clientId, updatedGameStats, updatedGameStats_Arrays, /* other data types */, clientRpcParams);
}
`,

    'ClientSideNetworkUpdate': // 9
        `// Client-side RPC to update local game variables with data received from the server.
[ClientRpc]
private void UpdateNetworkVariables_ClientRpc(ulong clientId, GameStats updatedGameStats, GameStats_Arrays updatedGameStats_Arrays, /* other data types */, ClientRpcParams clientRpcParams = default)
{
    // Update local game state with data received from the server
    _gameDataSO.tournamentPlayers = updatedGameStats.tournamentPlayers;
    _gameDataSO.numberOfPlayers = updatedGameStats.numberOfPlayers;
    // ... (other simple data updates)

    // Update local arrays with data received from the server
    for (int i = 0; i < updatedGameStats_Arrays.playerStackArray.Length; i++)
    {
        _gameDataSO.playerStackArray[i] = updatedGameStats_Arrays.playerStackArray[i];
    }
    for (int i = 0; i < updatedGameStats_Arrays.playerRoundEarningsArray.Length; i++)
    {
        _gameDataSO.playerRoundEarningsArray[i] = updatedGameStats_Arrays.playerRoundEarningsArray[i];
    }
    // ... (other array updates)

    // Update other data types

    // Trigger an event to update Game Manager variables and UI to reflect the new state
    RaiseUpdateGameManagerVariables(clientId);
}

// Raise an event to update Game Manager variables and UI
private void RaiseUpdateGameManagerVariables(ulong clientId)
{
    _eventHandlerSO.RaiseUpdateGameManagerVariablesEvent(clientId);
}
`,

    '6': // 10
        `private IEnumerator Bet_SmallBlind()
{
    // Wait for a specified duration before proceeding
    yield return _blindDelay;

    // ... small blind betting logic
}

private void ProcessPlayerSmallBlindBet(int playerIndex)
{
    int bet = _gameDataSO.smallBlindValue;
    // Check if the player has enough chips for the small blind
    if (_gameDataSO.playerStackArray[playerIndex] < _gameDataSO.smallBlindValue)
    {
        // Handle cases where the player's stack is insufficient by assigning the player's stack remaining amount instead
        bet = _gameDataSO.playerStackArray[playerIndex];
    }

    // Update UI elements via event handler
    _eventHandlerSO.RaiseUpdateSmallBlindUI(playerIndex, bet);
}

private void TriggerSmallBlindBetEvent(int playerIndex)
{
    // Raise an event to signal that a small blind bet has been placed
    _eventHandlerSO.RaiseChipsBetEvent(playerIndex, _gameDataSO.betPlayerArray[playerIndex]);
}


/// ... In the UI Manager Script ... ///


private void UpdateSmallBlindUI(int playerIndex, int bet)
{
    // Update the player's stack and bet display
    playerStackTextArray[playerIndex].text = _gameDataSO.playerStackArray[playerIndex].ToString("n0");
    betTextArray[playerIndex].text = bet.ToString("n0");

    // Enable UI elements related to betting
    betButtonArray[playerIndex].enabled = true;
    betImage[playerIndex].enabled = true;

    // Update the pot total display
    potText.text = string.Format("{0} {1}", LocalizationSettings.StringDatabase.GetLocalizedString("GameScene_Table", "TotalPot"), _gameDataSO.pot.ToString("n0"));
}

// ...
`,
    '7':  // 11
        `// Delegate for handling UI updates related to the small blind bet.
public UnityAction&lt;int, int&gt; onUpdateSmallBlindUI;

public void RaiseUpdateSmallBlindUI(int playerIndex, int bet)
{
    // Check to avoid a NullReferenceException if there are no subscribers
    if (onUpdateSmallBlindUI != null)
    {
        // Invoke the event, notifying all subscribed methods
        onUpdateSmallBlindUI.Invoke(playerIndex, bet);
    }
}
`,
    '8': // 12
        `public UnityAction&lt;int, int&gt; onUpdateBlindUI;

public void RaiseUpdateBlindUI(int playerIndex, int bet)
{
    // Invoke the event only if there are subscribers
    onUpdateBlindUI?.Invoke(playerIndex, bet);
}
`,
    '9': // 13
        `private enum CoroutineState { Active, Inactive, Reset, Stop };
private CoroutineState coroutineState = CoroutineState.Inactive;
`,
    '10': // 14
        `switch (coroutineState)
{
    case CoroutineState.Active: coroutineState = CoroutineState.Stop; break;
    default: break;
}
`,
    '11': // 15
        `private IEnumerator PlayerTurnUpdate()
{
    coroutineState = CoroutineState.Active;
    float seconds = _gameDataSO.turnSecondsValue;

    // ... (prepare parameters and send updates)

    while (seconds > 0)
    {
        switch (coroutineState)
        {
            case CoroutineState.Stop:

                // ... logic for updating and exiting the coroutine gracefully

                if (playerTurnCoroutine != null)
                {
                    StopCoroutine(playerTurnCoroutine);
                    playerTurnCoroutine = null;
                }
                coroutineState = CoroutineState.Inactive;
                yield break;

            case CoroutineState.Reset:

                // ... logic for updating and resetting the coroutine gracefully

                seconds = _gameDataSO.turnSecondsValue; // Reset the timer
                coroutineState = CoroutineState.Active;
                break;
        }

        seconds -= Time.deltaTime;

        // ... coroutine logic

        yield return null;
    }

    coroutineState = CoroutineState.Inactive;

    // ... logic for exiting the coroutine after time's up
}
`,
    '12': // 16
        `public enum PokerStreet
{
    PreFlop,
    Flop,
    Turn,
    River
}
_gameDataSO.turnIndex = PokerStreet.PreFlop;

// ... (other code)

[ClientRpc]
public void NextStreet_ClientRpc()
{
    // Assign the current street pot to the corresponding turn index
    AssignStreetPot();

    // Update the earnings for each player at the end of the current round
    UpdatePlayerRoundEarnings();

    // Increment the turn index
    IncrementTurnIndex();

    // Reset the bets for all players to zero for the new round
    ResetBets();

    // Clear the list of players who are currently betting
    playersBettingList.Clear();

    // Start a coroutine to animate pot chips
    StartCoroutine(activatePotChipsCoroutine);

    // Raise an event to update the game graphics based on the new game state
    _eventHandlerSO.RaiseUpdateVisuals_EndStreet();

    // Raise an event to update the bet text
    _eventHandlerSO.RaiseUpdateBetText_EndStreet();

    // Raise events to trigger sounds effects by the Audio Manager
    _eventHandlerSO.RaiseAudioCueEvent(_audioStorageSO.chipSlideSFX, _audioStorageSO.standardVol);
    _eventHandlerSO.RaiseAudioCueEvent(_audioStorageSO.streetEndSFX, _audioStorageSO.standardVol);

    // Only the host sets up the turn
    if (IsServer || IsHost)
    {
        TurnSetup_ServerRpc();
    }
}

private void AssignStreetPot()
{
    switch (_gameDataSO.turnIndex)
    {
        case PokerStreet.PreFlop: _gameDataSO.preFlopPot = _gameDataSO.pot; break;
        case PokerStreet.Flop: _gameDataSO.flopPot = _gameDataSO.pot; break;
        case PokerStreet.Turn: _gameDataSO.turnPot = _gameDataSO.pot; break;
        case PokerStreet.River: _gameDataSO.riverPot = _gameDataSO.pot; break;
    }
}

private void UpdatePlayerRoundEarnings()
{
    // Iterate through each player in the game
    for (int i = 0; i < _gameDataSO.playerArray.Length; i++)
    {
        // Check if the current player has placed a bet
        if (_gameDataSO.betPlayerArray[i] > 0)
        {
            // Trigger an animation for the bet moving to the pot for the current player
            _eventHandlerSO.RaiseBetAnimationToPotEvent(i);

            // Iterate through all players to calculate earnings
            for (int j = 0; j < _gameDataSO.betPlayerArray.Length; j++)
            {
                // Determine the minimum bet between the current player and each other player
                int minimumBet = Math.Min(_gameDataSO.betPlayerArray[i], _gameDataSO.betPlayerArray[j]);

                // Add the minimum bet to the current player's round earnings
                _gameDataSO.playerRoundEarningsArray[i] += minimumBet;
            }
        }
    }
}

private void IncrementTurnIndex()
{
    // Cast the current enum to an integer, increment it, and then cast back to the enum
    _gameDataSO.turnIndex = (PokerStreet)(((int)_gameDataSO.turnIndex + 1) % Enum.GetNames(typeof(PokerStreet)).Length);
}

private void ResetBets()
{
    Array.Clear(_gameDataSO.betPlayerArray, 0, _gameDataSO.betPlayerArray.Length);
}
`,
    '13':
        `if (_gameDataSO.turnIndex < 4)
    _gameDataSO.turnIndex ++;
else _gameDataSO.turnIndex = 0;
`,

    'OnDemandRendering1':
        `OnDemandRendering
`,
    'ApplySafeArea':
        `ApplySafeArea
`,
    'Screen':
        `Screen
`,
    'OnRectTransformDimensionsChange':
        `OnRectTransformDimensionsChange
`,

    '14':
        `private void ApplySafeArea()
{
    if (_panelSafeArea == null)
        return;
    
    Rect safeArea = Screen.safeArea;
    
    Vector2 anchorMin = _panelSafeArea.anchorMin;
    Vector2 anchorMax = _panelSafeArea.anchorMax;
    
    // Apply safe area only on the Y axis
    anchorMin.y = safeArea.position.y / _canvas.pixelRect.height;
    anchorMax.y = (safeArea.position.y + safeArea.size.y) / _canvas.pixelRect.height;
    
    // Assign the existing values for the X axis
    anchorMin.x = _panelSafeArea.anchorMin.x;
    anchorMax.x = _panelSafeArea.anchorMax.x;
    
    _panelSafeArea.anchorMin = anchorMin;
    _panelSafeArea.anchorMax = anchorMax;
    
    _currentOrientation = Screen.orientation;
    _currentSafeArea = Screen.safeArea;
    
    // Maximum aspect ratio that you want to allow
    float maxAspectRatio = _maxAspectRatioWidth / _maxAspectRatioHeight;
    _aspectRatioRef = maxAspectRatio;
    
    SetCanvasBehavior();
}
`,

    '15':
        `using UnityEngine;
using UnityEngine.Rendering;
using System.Collections;

// This example shows how to use effectiveRenderFrameRate to ensure your application renders at a given frame rate regardless of
// settings that could be changed by the user. Also demonstrates use of setting renderFrameInterval from a coroutine.
public class Example : MonoBehaviour
{
    void Start()
    {
        const int myTargetFrameRate = 10;

        // Start off assuming that Application.targetFrameRate is 60 and QualitySettings.vSyncCount is 0
        OnDemandRendering.renderFrameInterval = 6;

        // Some applications may allow the user to modify the quality level. So we may not be able to rely on
        // the framerate always being a specific value. For this example we want the effective framerate to be 10.
        // If it is not then check the values and adjust the frame interval accordingly to achieve the framerate that we desire.
        if (OnDemandRendering.effectiveRenderFrameRate != 10)
        {
            if (QualitySettings.vSyncCount > 0)
            {
                OnDemandRendering.renderFrameInterval = (Screen.currentResolution.refreshRate / QualitySettings.vSyncCount / myTargetFrameRate);
            }
            else
            {
                // In this case, the 'Aplication.targetFrameRate' is 60, so the 'renderFrameInterval' value
                // would be 60/10 = 6, which translates into the game rendering at 10 frames per second.
                OnDemandRendering.renderFrameInterval = (Application.targetFrameRate / myTargetFrameRate);
            }
        }
    }

    private void FooAction1()
    {
        // Let's assume this function triggers an action where animations are going on and we need the game to render at full speed.
        // When setting the renderFrameInterval to 1, we'd be rendering back at 60 frames per second:
        OnDemandRendering.renderFrameInterval = 1;
    }
}
`,

    '16_OLD':
        `private void CalculateWayPoints()
{
    // Clear the lists before assigning new values
    pathWayPointsFirstHalf.Clear();
    pathWayPointsSecondHalf.Clear();
    _gameDataSO.fullPathWayPoints.Clear();

    // Define increment for t value
    const float increment = 0.05f;

    for (float t = 0; t <= 1; t += increment)
    {
        // Calculate points for the first Bezier Curve
        pathWayPointsFirstHalf.Add(Mathf.Pow(1 - t, 3) * controlPoints[0].position +
            3 * Mathf.Pow(1 - t, 2) * t * controlPoints[1].position +
            3 * (1 - t) * Mathf.Pow(t, 2) * controlPoints[2].position +
            Mathf.Pow(t, 3) * controlPoints[3].position);

        // Calculate points for the second Bezier Curve
        pathWayPointsSecondHalf.Add(Mathf.Pow(1 - t, 3) * controlPoints[4].position +
            3 * Mathf.Pow(1 - t, 2) * t * controlPoints[5].position +
            3 * (1 - t) * Mathf.Pow(t, 2) * controlPoints[6].position +
            Mathf.Pow(t, 3) * controlPoints[7].position);
    }

    // Combine the curves into a single list to represent the full path
    _gameDataSO.fullPathWayPoints.AddRange(pathWayPointsFirstHalf);
    _gameDataSO.fullPathWayPoints.AddRange(pathWayPointsSecondHalf);
}
`,
    '16':
        `// ... (In a Scriptable Object for static data)

// Fixed-size array for efficiency
Vector2[] wayPoints = new Vector2[42];

// ... (In our current script)

private void CalculateWayPoints()
{
    // Define increment for t value
    const float increment = 0.05f;

    // Start storing the first curve (first half of the ellipsoid)
    // at index 0 so it goes sequentially (0-20)
    int firstHalfIndex = 0;
    // Start storing the second curve (second half of the ellipsoid)
    // at index 21 so it goes sequentially (21-41)
    int secondHalfIndex = 21;
    
    for (float t = 0; t <= 1; t += increment)
    {
        // Calculate points for the first Bezier Curve
        _dataStorage.wayPoints[firstHalfIndex++] =
            Mathf.Pow(1 - t, 3) * controlPoints[0].position +
            3 * Mathf.Pow(1 - t, 2) * t * controlPoints[1].position +
            3 * (1 - t) * Mathf.Pow(t, 2) * controlPoints[2].position +
            Mathf.Pow(t, 3) * controlPoints[3].position;

        // Calculate points for the second Bezier Curve
        _dataStorage.wayPoints[secondHalfIndex++] =
            Mathf.Pow(1 - t, 3) * controlPoints[4].position +
            3 * Mathf.Pow(1 - t, 2) * t * controlPoints[5].position +
            3 * (1 - t) * Mathf.Pow(t, 2) * controlPoints[6].position +
            Mathf.Pow(t, 3) * controlPoints[7].position;
    }
}
`,

    '17':
        `private IEnumerator MoveBlind(int index, int finalPos)
{
    // Initialize current position and t parameter
    _currentPos = Vector3.zero;
    t = 0;

    // Get total count of waypoints
    int count = _dataStorage.wayPoints.Length;

    // Represents the starting index from which we begin traversing waypoints
    int start = index;

    // Calculates the difference between the final position and the starting position
    int delta = finalPos - start;

    // Adjusts delta if final position is before the starting position in the list of waypoints
    if (delta < 0)
        delta += count;

    // Variables to store indices of current and next waypoints along the Bezier curve
    int i1;
    int i2;

    // Reset index
    index = 0;

    // Set speed
    float speed = _speed;

    // Continuously move object along Bezier curve
    while (true)
    {
        // Increment t parameter based on time and speed
        t += Time.deltaTime * speed;

        // Update index and adjust t if it exceeds 1
        while (t >= 1)
        {
            index += 1;
            t -= 1;
        }

        // Get indices for current and next waypoints
        i1 = (start + index) % count;
        i2 = (start + index + 1) % count;

        // Check if movement is complete
        if (index >= delta)
        {
            // Raise event indicating blind movement completion
            _gameDataSO.RaiseBlindDoneEvent();
            break;
        }
        // Check if index exceeds waypoint count
        if (index > _dataStorage.wayPoints.Length - 1)
        {
            // Reset index to ensure looping through waypoints
            index = 0;
            continue;
        }

        // Interpolate between current and next waypoints based on t parameter
        _objectPosition = Vector3.Lerp(_dataStorage.wayPoints[i1], _dataStorage.wayPoints[i2], t);
        // Update object position
        transform.position = _objectPosition;
        _currentPos = transform.position;

        // Yield until next frame
        yield return null;
    }

    // Set final object position
    _objectPosition = _dataStorage.wayPoints[finalPos];
    transform.position = _objectPosition;
    _currentPos = transform.position;
}
`,

    'script_tileState':
        `[Serializable]
public struct TileState
{
    public int Value;
    public bool HasMerged;
    public bool Locked;


    public Vector2Int Origin;
    public Vector2Int Destination;

    public TileState(int value, bool hasMerged, bool locked, Vector2Int origin, Vector2Int destination)
    {
        Value = value;
        HasMerged = hasMerged;
        Locked = locked;

        Origin = origin;
        Destination = destination;
    }
}
`,

    'script_updateTilesMovement':
        `private async UniTaskVoid UpdateTilesMovement(int taskVersion)
{
    float t = 0;
    while (t < 1)
    {
        // If the task version has changed, exit the method early.
        if (taskVersion != _taskVersion[(int)UniTasker.TileMove]) return;

        // Increment 't' based on delta time and animation duration.
        t += Time.deltaTime / _gameDataSO.animDuration;

        // Loop through the tiles to move in reverse order and update their movement.
        for (int i = _tilesToMove.Count - 1; i >= 0; i--)
        {
            TileController tile = _tilesToMove[i];
            tile.UpdateMovement(t);
        }

        await UniTask.Yield();
    }

    if (taskVersion != _taskVersion[(int)UniTasker.TileMove]) return;

    // Move the tiles to their final positions.
    for (int i = _tilesToMove.Count - 1; i >= 0; i--)
    {
        _tilesToMove[i].MoveToEnd();
    }

    // Clear the list.
    _tilesToMove.Clear();

    // Trigger events after the animation has finished.
    TriggerEvents();
}
`,

    'script_tileState_h':
        `#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "Containers/StaticArray.h"
#include "UBoardManager.generated.h"

/**
 * Tile info
 */

USTRUCT(BlueprintType)
struct FTileState
{
    GENERATED_USTRUCT_BODY()

    int Value;
    bool HasMerged;
    bool Locked;

    FVector2D Origin;
    FVector2D Destination;

    // CTOR
    explicit FTileState(const int InValue = 0, const bool bInHasMerged = false, const bool bInLocked = false, const FVector2D InOrigin = FVector2D(0, 0),
    const FVector2D InDestination = FVector2D(0, 0))
        : Value(InValue), HasMerged(bInHasMerged), Locked(bInLocked), Origin(InOrigin), Destination(InDestination) {}
};

/**
 * Manager that handles tiles
 * and the Board state
 */

UCLASS(Blueprintable)
class ATOMICTILES_API UBoardManager : public UObject
{
    GENERATED_BODY()

    // ctor / dtor
    UBoardManager();
    ~UBoardManager();

private: // variables

    TStaticArray&lt;FTileState, 16&gt; Tiles; // Fixed-size 1-dimensional array for the 4x4 board

    // ... other variables

protected: // implementation

    UFUNCTION(BlueprintCallable, Category = "GameMode")
    static void TileState(UPARAM(ref)FTileState& TileState);

    void ResetBoard();

    void SpawnTile();

    // ... other functions
};
`,

    'resetBoard_cpp':
        `#include "GameMode.h"

/* ... */

void UBoardManager::ResetBoard()
{
	Tiles.Reset(); // Clear the existing board

    // Initialize each element
    for (int y = 0; y < 4; y++)
    {
        for (int x = 0; x < 4; x++)
        {
            const int Index = x + y * 4;   // Calculate the 1D index for the 2D position (x, y)
            const FVector2D Pos(x, y);     // 2D position
            Tiles[Index] = FTileState(0, false, false, Pos, Pos); // Initialize tile
        }
    }
}
`,

    'spawnTile_cpp':
        `void UBoardManager::SpawnTile()
{
	// Clear the list of empty positions
	EmptyPositions.Reset();

	// Find all empty positions on the board
    constexpr int BoardWidth = 4; // Width of the board
	for (int y = 0; y < 4; y++)
	{
		for (int x = 0; x < 4; x++)
		{
            const int Index = x + y * BoardWidth; // Calculate the 1D index
		    if (Tiles[Index].Value == 0)
		    {
		    	EmptyPositions.Add(FIntPoint(x, y));
		    }
		}
	}

	// If there are any empty positions, spawn a tile in a random one
	if (EmptyPositions.Num() > 0)
	{
		// Choose a random empty position
		const int RandomIndex = FMath::RandRange(0, EmptyPositions.Num() - 1);
		const FIntPoint SpawnPosition = EmptyPositions[RandomIndex];

		// Assign a random value to the new tile (90% chance for 1, 10% chance for 2)
		const int NewTileValue = (FMath::FRand() < 0.9f) ? 1 : 2;
		Tiles[SpawnPosition.X][SpawnPosition.Y].Value = NewTileValue;

		// Update the largest tile value if necessary
		if (NewTileValue > GlobalData->LargestTile)
		{
			GlobalData->LargestTile = NewTileValue;
		}

		// Add the position of the spawned tile to the list of spawn positions
		const FIntPoint TilePos = FIntPoint(SpawnPosition.X, SpawnPosition.Y);
		SpawnPositions.Add(TilePos);
	}
	else { } // No empty positions on the board
}
`,


    'gameData_json':
        `[
  // Hydrogen (H-1)
  {
    "name": "H₂ (Hydrogen)",
    "shortName": "H₂",
    "atomList": [
      { "value": 1 },
      { "value": 1 }
    ],
    "defaultUnlocked": true,
    "difficultyLevel": 1
  },

  // Hellium (He-2)
  {
    "name": "He₂ (Dihellium)",
    "shortName": "He₂",
    "atomList": [
      { "value": 2 },
      { "value": 2 }
    ],
    "defaultUnlocked": true,
    "difficultyLevel": 3
  },

  // ...

  // Oxygen (O-8)
  {
    "name": "H₂O (Water)",
    "shortName": "H₂O", 
    "atomList": [
      { "value": 1 },
      { "value": 1 },
      { "value": 8 }
    ],
    "defaultUnlocked": false,
    "difficultyLevel": 2
  },

  // ...

  ]
`,


    'loadMoleculesFromJson':
        `// This method loads molecules from a JSON file stored in the Resources folder.
List&lt;Molecule&gt; LoadMoleculesFromJson()
{
    // Load the JSON file containing molecule data
    TextAsset textAsset = Resources.Load&lt;TextAsset&gt;("MoleculesList");

    // If the JSON file is not found, return an empty list of molecules
    if (textAsset == null)
    {
        return new List<&lt;Molecule&gt;();
    }
    
    // Extract the JSON text from the loaded asset
    string jsonText = textAsset.text;

    // Deserialize the JSON text into a list of Molecule objects
    List&lt;Molecule&gt; molecules = JsonConvert.DeserializeObject&lt;List&lt;Molecule&gt;&gt;(jsonText);

    // Populate lists and dictionaries for each molecule
    foreach (var molecule in molecules)
    {
        PopulateMoleculeData(molecule);
    }

    // Return the list of molecules
    return molecules;
}

// This method populates lists and dictionaries related to the given molecule.
private void PopulateMoleculeData(Molecule molecule)
{

    // Add the molecule to the allMolecules dictionary in the data storage scriptable object
    _dataStorageSO.AddToDict_AllMolecules(molecule);

    // ... populate other lists and dictionaries
}
`,

    '18':
        `[ServerRpc(RequireOwnership = false)]
`,

    'NativeNotification':
        `/// &lt;summary&gt;
/// Displays a prompt to verify the user's birthdate using a localized dialog.
/// Offers options to enter a date or cancel the action.
/// &lt;/summary&gt;
private void BirthdatePrompt()
{
    // Create a new native notification instance
    NativeNotification notification = NativeNotification.CreateInstance();

    // Localized strings for notification content
    string localizedTitle = LocalizationSettings.StringDatabase.GetLocalizedString(_localizationData.AT_LocalizationTable, _localizationData.AgeVerificationKey);
    string localizedMessage = LocalizationSettings.StringDatabase.GetLocalizedString(_localizationData.AT_LocalizationTable, _localizationData.BirthdateDescKey);
    string localizedOkayButton = LocalizationSettings.StringDatabase.GetLocalizedString(_localizationData.AT_LocalizationTable, _localizationData.OkayButtonKey);
    string localizedCancelButton = LocalizationSettings.StringDatabase.GetLocalizedString(_localizationData.AT_LocalizationTable, _localizationData.CancelButtonKey);

    notification.Title = localizedTitle;
    notification.Message = localizedMessage;

    // Add a button for setting birthdate via a date picker
    notification.AddButton(localizedOkayButton, () =>
    {
        DatePicker datePicker = DatePicker.CreateInstance(DatePickerMode.Date);
        datePicker.SetOnCloseCallback(result =>
        {
            // Update birthdate if a date is selected,
            // otherwise use a sentinel value
            _dataStorage.UserBirthdate = result.SelectedDate ?? DateTime.MinValue;
            _dataStorage.HasUserAge = result.SelectedDate.HasValue;

            CompleteAgeVerification();
        });
        datePicker.Show();
    });

    // Add a button to cancel without entering a date
    notification.AddButton(localizedCancelButton, CompleteAgeVerification);

    // Display the notification
    notification.Show();
}
`,

    'DailyChallengeReset':
        `DateTime utcNow = DateTime.UtcNow;  // Use UTC time
DateTime lastChallengeUtcDate = GetLastChallengeUtcDate();  // Stored in UTC

if (utcNow.Date != lastChallengeUtcDate.Date)
{
    UpdateDailyChallenge();
}
`,


    'PlaceHolder':
        `[ServerRpc(RequireOwnership = false)]
`,
    // Add more snippets as needed
};


/**
 * COPY TO CLIPBOARD FUNCTION
 */

// Keep track of the timer to reset the SVG
let resetTimer;

function handleCopy(elementId, button) {
    const codeBlock = document.getElementById(elementId);
    const text = codeBlock.textContent;

    // Copy text to clipboard
    navigator.clipboard.writeText(text)
        .then(() => {
            if (button) {
                // Apply success class to the button
                button.classList.add('success');

                // Clear any existing timers
                clearTimeout(resetTimer);

                // Set a new timer to reset after 2 seconds
                resetTimer = setTimeout(() => {
                    button.classList.remove('success'); // Revert to "copy" icon
                }, 2000);
            } else {
                console.error('Button not recognized');
            }
        })
        .catch(err => {
            console.error('Failed to copy text:', err);
        });
}

function copyToClipboard(elementId) {
    // Get the text content of the element
    const codeBlock = document.getElementById(elementId);
    const text = codeBlock.textContent;

    // Create a temporary textarea element to hold the text
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = text;
    document.body.appendChild(tempTextarea);

    // Select and copy the text
    tempTextarea.select();
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(tempTextarea);

    // Optional: Notify the user
    alert('Code copied to clipboard!');
}

/**
 * CODE SNIPPETS LOGIC
 */

Object.keys(codeSnippets).forEach(function (key) {
    var element = document.getElementById(key);
    if (element) {
        element.textContent = codeSnippets[key];

        //const snippetId = element.getAttribute('id');
        //processCustomHighlight(snippetId);
    }


});

document.addEventListener('DOMContentLoaded', function () {

    Prism.hooks.add('complete', function (env) {
        const element = env.element; // Current <code> block being processed
        const snippetId = element.getAttribute('id');

        if (snippetId && customHighlightRules[snippetId]) {
            highlightWordsInSnippet(element, customHighlightRules[snippetId]);
        }
    });
    
    Prism.highlightAll();
})
//Prism.highlightAll();

// // Define custom highlight rules
// const customHighlightRules = {
//     'ServerSideNetworkUpdate': [
//         {word: 'updatedGameStats_Arrays', className: 'custom-class'},
//         {word: 'GameStats_Arrays', className: 'custom-class'}
//     ],
//     'Id2': [
//         {word: 'whatever', className: 'highlight-green'},
//         {word: 'whatever2', className: 'highlight-blue'}
//     ]
// };
// console.log('DOM LISTENER ADDED');
// // Function to perform highlighting
// function highlightWordsInSnippet(element, patterns) {
//
//     //let innerHTML = element.innerHTML; // Work on the content in-memory
//     let innerHTML = element.textContent; // Work on the content in-memory
//     console.log('Highlighting the Words in our snippet');
//
//     patterns.forEach(({word, className}) => {
//         console.log('word: ', word);
//         console.log('className: ', className);
//         const regex = new RegExp(`\\b${word}\\b`, 'g'); // Match whole words
//         innerHTML = innerHTML.replace(regex, `<span class="${className}">${word}</span>`);
//     });
//     element.innerHTML = innerHTML; // Update the DOM only once
//     console.log('UPDATING THE DOM ONCE');
// }
//
// // Efficiently iterate through <code> elements
// document.querySelectorAll('code').forEach(codeElement => {
//     const snippetId = codeElement.getAttribute('id'); // Check for an ID
//     console.log('SnippetId: ', snippetId);
//     console.log('customHighlightRules[snippetId]: ', customHighlightRules[snippetId]);
//     if (snippetId && customHighlightRules[snippetId]) {
//         // Apply highlighting only if there are custom rules for this ID
//         highlightWordsInSnippet(codeElement, customHighlightRules[snippetId]);
//     }
// });
function highlightWordsInSnippet(element, rules) {
    // Recursive function to process child nodes
    function processNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            // Highlight text nodes if they contain keywords
            let text = node.textContent;

            rules.forEach(rule => {
                
                if (rule.regex) {
                    // Regex pattern that matches the word with space checks, etc.
                    const regex = rule.regexPattern;
                    //content = content.replace(regex, match => `<span class="${rule.tokenId}">${match}</span>`);
                    text = text.replace(
                        regex,
                        `<span class="${rule.tokenId}">${rule.word}</span>`);
                } else {
                const regex = new RegExp(`\\b${rule.word}\\b`, 'g');
                text = text.replace(
                    regex,
                    `<span class="${rule.tokenId}">${rule.word}</span>`
                );
            }
            });
            
            // ----- ORIGINAL WITHOUT REGEX ----- 
            // rules.forEach(rule => {
            //     const regex = new RegExp(`\\b${rule.word}\\b`, 'g');
            //     text = text.replace(
            //         regex,
            //         `<span class="${rule.tokenId}">${rule.word}</span>`
            //     );
            // });

            // Replace the text node with a new HTML structure
            if (text !== node.textContent) {
                const wrapper = document.createElement('span');
                wrapper.innerHTML = text;
                node.replaceWith(wrapper);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Recursively process child elements
            Array.from(node.childNodes).forEach(child => processNode(child));
        }
    }

    // Start processing from the element's child nodes
    Array.from(element.childNodes).forEach(child => processNode(child));
}

// Custom highlighting rules based on snippet ID
const customHighlightRules = {
    ServerSideNetworkUpdate: [
        { word: 'updatedGameStats_Arrays', tokenId: 'custom-class' },
        { word: 'GameStats_Arrays', tokenId: 'custom-class' }
    ],
    resetBoard_cpp: [
        { word: 'Tiles', tokenId: 't-class-field-var-cpp' },
        { word: 'Pos', tokenId: 't-local-var-cpp' },
    ],
    spawnTile_cpp: [
        { word: 'Tiles', tokenId: 't-class-field-var-cpp' },
        { word: 'EmptyPositions', tokenId: 't-class-field-var-cpp' },
        { word: 'SpawnPositions', tokenId: 't-class-field-var-cpp' },
        { word: 'GlobalData', tokenId: 't-class-field-var-cpp' },
        { word: 'LargestTile', tokenId: 't-class-field-var-cpp' },
        { word: 'X', tokenId: 't-struct-field-var-cpp' },
        { word: 'Y', tokenId: 't-struct-field-var-cpp' },
    ],
    script_tileState_h: [
        { word: 'ATOMICTILES_API', tokenId: 't-macro-cpp' },
        { word: 'ref', tokenId: 't-macro-cpp' },
        { word: 'Value', tokenId: 't-struct-field-var-cpp' },
        { word: 'HasMerged', tokenId: 't-struct-field-var-cpp' },
        { word: 'Locked', tokenId: 't-struct-field-var-cpp' },
        { word: 'Origin', tokenId: 't-struct-field-var-cpp' },
        { word: 'Destination', tokenId: 't-struct-field-var-cpp' },
        { word: 'Tiles', tokenId: 't-class-field-var-cpp' },
        {
            word: 'UObject', // Example of a word needing regex logic
            tokenId: 't-class-cpp',
            regex: true, // This word needs to use regex logic
            regexPattern: /(?<=\s)UObject(?=\s)/g // Only match with spaces before and after
        },
        {
            word: 'UBoardManager', // Example of a word needing regex logic
            tokenId: 't-class-cpp',
            regex: true, // This word needs to use regex logic
            regexPattern: /(?<=\s)UBoardManager(?=\s)/g // Only match with spaces before and after
        },
    ]
};


// Register a single Prism hook globally
// Prism.hooks.add('before-highlight', function (e) {
//     const snippetId = e.element.getAttribute('id');
//     processCustomHighlight(snippetId);
//     console.log('SnippetId: ', snippetId);
//
// });



// Inline Prettify (cleaning paragraphs and indexing — <il>, <ol> and other classes but <span>)

function cleanInlinePrettify() {
    var codeElements = document.querySelectorAll('.inline-code-prettify');

    // Check if Prettify has run by looking for the presence of 'li' elements
    var prettifyComplete = Array.from(codeElements).every(function (el) {
        return el.querySelector('li') !== null;
    });

    if (!prettifyComplete) {
        // If Prettify hasn't run yet, try again after a short delay
        setTimeout(cleanInlinePrettify, 100);
        //console.log("waiting for prettify");
        return;
    }

    // Prettify formatting is present, now perform the cleanup
    codeElements.forEach(function (el) {
        var content = '';
        var spans = el.querySelectorAll('span');
        spans.forEach(function (span) {
            content += span.outerHTML;
        });
        el.innerHTML = content; // Set the HTML content to only the gathered spans
    });
}

// Initial call to the function
cleanInlinePrettify();

//<script>
//        // Prettify the inline code
//        //function cleanInlinePrettify() {
//        //    var inlineCode = document.getElementById('inline-code-prettify');

//        //    if (inlineCode) {
//        //        // Gather the HTML content of the spans
//        //        var content = '';
//        //        var spans = inlineCode.getElementsByTagName('span');
//        //        for (var i = 0; i < spans.length; i++) {
//        //            content += spans[i].outerHTML;
//        //        }

//        //        // Set the HTML content to only the gathered spans
//        //        inlineCode.innerHTML = content;
//        //    }
//        //}


//        // --------------------------------


//        function cleanInlinePrettify() {
//            // Get all elements with the class 'inline-code-prettify'
//            var codeElements = document.querySelectorAll('.inline-code-prettify');

//            // Iterate over the NodeList
//            codeElements.forEach(function (el) {
//                // Gather the HTML content of the spans
//                var content = '';
//                var spans = el.getElementsByTagName('span');
//                for (var i = 0; i < spans.length; i++) {
//                    content += spans[i].outerHTML;
//                }

//                // Set the HTML content to only the gathered spans
//                el.innerHTML = content;
//            });
//        }


//        // Run the cleanInlinePrettify function after Prettify has finished running
//        // Adjust the timing as needed based on when Prettify runs
//        window.addEventListener('DOMContentLoaded', cleanInlinePrettify);

//        //function cleanInlinePrettifyDelay() {
//        //    setTimeout(cleanInlinePrettify, 5000);
//        //}

//    </script>