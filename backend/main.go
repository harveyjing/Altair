package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
)

func executeCode(code string) (string, error) {
	filePath := "/tmp/main.go"
	outputPath := "/tmp/output.txt"

	// Write code to a temporary file
	err := os.WriteFile(filePath, []byte(code), 0644)
	if err != nil {
		return "", err
	}

	// Execute the Golang code and capture the output
	cmd := exec.Command("go", "run", filePath)
	cmd.Stdout, _ = os.Create(outputPath)
	cmd.Stderr = cmd.Stdout
	err = cmd.Run()

	// Read and return the output
	output, err1 := os.ReadFile(outputPath)
	if err1 != nil {
		return "", err
	}

	if err != nil {
		return string(output), err
	}

	return string(output), nil
}

func handleExecution(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}

	code := string(body)
	output, err := executeCode(code)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error executing code: %v, Error hint: %v", err, output), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, output)
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("./build")))
	http.HandleFunc("/api/execute", handleExecution)
	port := 8080
	fmt.Printf("Server is running on :%d\n", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
}
