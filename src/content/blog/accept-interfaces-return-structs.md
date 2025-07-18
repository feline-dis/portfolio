---
title: "Accept Interfaces, Return Structs"
description: "Diving deep into one of the most important idioms in Golang."
publishDate: 2024-01-10
tags: ["Golang", "Design Patterns", "Best Practices", "Backend", "Code Quality"]
featured: true
draft: false
---

# Accept Interfaces, Return Structs: A Go Idiom That Will Change How You Think About APIs

One of the most powerful and elegant idioms in Go is "accept interfaces, return structs." If you're coming from other languages, this might seem counterintuitive at first. After all, many object-oriented languages encourage you to return interfaces to hide implementation details. But Go's approach is different, and once you understand why, it will fundamentally change how you design APIs.

## What Does "Accept Interfaces, Return Structs" Mean?

This idiom suggests that when designing functions and methods:
- **Parameters should be interfaces** (when possible)
- **Return values should be concrete types** (usually structs)

Let's see this in action with a practical example.

## The Traditional Approach (What NOT to Do)

If you're coming from Java or C#, you might be tempted to write something like this:

```go
// DON'T DO THIS
type FileProcessor interface {
    ProcessFile(filename string) error
    GetResults() []string
}

type CSVProcessor struct {
    results []string
}

func (c *CSVProcessor) ProcessFile(filename string) error {
    // Process CSV file
    c.results = append(c.results, "processed "+filename)
    return nil
}

func (c *CSVProcessor) GetResults() []string {
    return c.results
}

// Returning an interface - this is NOT the Go way
func NewFileProcessor() FileProcessor {
    return &CSVProcessor{}
}
```

This looks familiar if you're used to dependency injection frameworks, but it's not idiomatic Go.

## The Go Way: Accept Interfaces, Return Structs

Here's how we'd restructure this following Go idioms:

```go
// Define interfaces for what we CONSUME
type FileReader interface {
    Read(filename string) ([]byte, error)
}

type Logger interface {
    Log(message string)
}

// Return concrete structs
type CSVProcessor struct {
    reader FileReader
    logger Logger
    Results []string
}

// Accept interfaces as parameters
func NewCSVProcessor(reader FileReader, logger Logger) *CSVProcessor {
    return &CSVProcessor{
        reader: reader,
        logger: logger,
        Results: make([]string, 0),
    }
}

func (c *CSVProcessor) ProcessFile(filename string) error {
    data, err := c.reader.Read(filename)
    if err != nil {
        return err
    }
    
    c.logger.Log(fmt.Sprintf("Processing file: %s", filename))
    
    // Process the CSV data
    c.Results = append(c.Results, "processed "+filename)
    return nil
}
```

## Why This Works Better

### 1. **Flexibility at the Boundaries**

When you accept interfaces, you make your functions incredibly flexible. Look at how easy it is to test our `CSVProcessor`:

```go
// Mock implementations for testing
type MockFileReader struct {
    data []byte
    err  error
}

func (m *MockFileReader) Read(filename string) ([]byte, error) {
    return m.data, m.err
}

type MockLogger struct {
    messages []string
}

func (m *MockLogger) Log(message string) {
    m.messages = append(m.messages, message)
}

// Easy to test!
func TestCSVProcessor(t *testing.T) {
    mockReader := &MockFileReader{data: []byte("test,data"), err: nil}
    mockLogger := &MockLogger{}
    
    processor := NewCSVProcessor(mockReader, mockLogger)
    err := processor.ProcessFile("test.csv")
    
    assert.NoError(t, err)
    assert.Equal(t, []string{"processed test.csv"}, processor.Results)
    assert.Equal(t, []string{"Processing file: test.csv"}, mockLogger.messages)
}
```

### 2. **Concrete Types Are Self-Documenting**

When you return a concrete struct, users of your API know exactly what they're getting:

```go
processor := NewCSVProcessor(fileReader, logger)
// Users can see all available fields and methods
fmt.Println(processor.Results)  // Direct access to results
processor.ProcessFile("data.csv")  // Clear method signatures
```

Compare this to returning an interface where users have to guess what methods are available or constantly check documentation.

### 3. **Easier API Evolution**

When you return structs, you can add new methods and fields without breaking existing code:

```go
// Adding new functionality is straightforward
func (c *CSVProcessor) GetProcessedCount() int {
    return len(c.Results)
}

func (c *CSVProcessor) Reset() {
    c.Results = make([]string, 0)
}
```

If you had returned an interface, adding these methods would require updating the interface definition and potentially breaking existing implementations.

## Real-World Example: HTTP Client

Here's how this idiom appears in Go's standard library and real applications:

```go
// Accept interfaces for flexible input
type HTTPClient interface {
    Do(req *http.Request) (*http.Response, error)
}

type MetricsCollector interface {
    RecordRequest(method, url string, duration time.Duration)
}

// Return concrete struct
type APIClient struct {
    client     HTTPClient
    metrics    MetricsCollector
    BaseURL    string
    UserAgent  string
}

func NewAPIClient(client HTTPClient, metrics MetricsCollector, baseURL string) *APIClient {
    return &APIClient{
        client:    client,
        metrics:   metrics,
        BaseURL:   baseURL,
        UserAgent: "MyApp/1.0",
    }
}

func (a *APIClient) GetUser(id string) (*User, error) {
    start := time.Now()
    defer func() {
        a.metrics.RecordRequest("GET", "/users/"+id, time.Since(start))
    }()
    
    url := fmt.Sprintf("%s/users/%s", a.BaseURL, id)
    req, err := http.NewRequest("GET", url, nil)
    if err != nil {
        return nil, err
    }
    
    req.Header.Set("User-Agent", a.UserAgent)
    
    resp, err := a.client.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    var user User
    if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
        return nil, err
    }
    
    return &user, nil
}
```

## When to Break the Rule

Like all idioms, this one has exceptions:

### 1. **When You Need Runtime Polymorphism**

```go
// Sometimes you DO need to return interfaces
func CreateProcessor(fileType string) FileProcessor {
    switch fileType {
    case "csv":
        return &CSVProcessor{}
    case "json":
        return &JSONProcessor{}
    default:
        return &DefaultProcessor{}
    }
}
```

### 2. **When Interface Is the Core Abstraction**

```go
// io.Reader is returned because it IS the abstraction
func OpenFile(filename string) (io.Reader, error) {
    return os.Open(filename)
}
```

## Key Takeaways

1. **Accept interfaces** to make your functions flexible and testable
2. **Return structs** to give users concrete, self-documenting types
3. **Define interfaces at the point of use**, not at the point of implementation
4. **Keep interfaces small** - the smaller the interface, the more useful it is
5. **Don't create interfaces "just in case"** - create them when you need abstraction

## The Mental Shift

If you're coming from other languages, this idiom represents a fundamental shift in thinking. Instead of designing inheritance hierarchies and abstract base classes, you're designing around behavior (interfaces) at consumption points while providing concrete, usable types as outputs.

This approach leads to more composable, testable, and maintainable code. It's one of the reasons Go codebases tend to be so readable and why the language encourages such clean architectural patterns.

The next time you're designing an API in Go, remember: be generous with what you accept (interfaces) and specific with what you return (structs). Your future self and your users will thank you.