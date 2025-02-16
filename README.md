# SWE Take Home Assignment

## Setting up

Install required packages

```
npm install
```

Compile and run

```
npm run dev
```

The console should now print `Server is now on http://localhost:3000`!

## Testing Users

Navigate to `http://localhost:3000/users` in your browser to check the initial
data, or run in your console:

```
npm run users 'http://localhost:3000/users'
```

To test the parameters, navigate to
`http://localhost:3000/users?<parameter options here>` Examples:

- _min and max_: `http://localhost:3000/users?min=2500&max=2700`
- _sort_: `http://localhost:3000/users?sort=name`
- _offset and limit_: `http://localhost:3000/users?offset=1&limit=2`

Of course, you can also run the commands using the console. Though, do remember
to enclose any `&` symbols in double quotes `""` to avoid errors in PowerShell.
For example:

```
npm run users 'http://localhost:3000/users?min=2500"&"max=2700'
```

Feel free to combine the different parameters!

## Testing Upload

There are 3 data.csv files provided in the `src/sample-data` folder:

1. `data.csv`: a csv file containing correct inputs for all rows and columns,
   including negative and 0 values.
2. `badSalaryData.csv`: a csv file containing illegal salary inputs.
3. `badColData.csv`: a csv file containing an incorrect number of columns.

In your console, run:

```
npm run upload --filePath=<file path here>
```

to test the uploads.

For example:

```
npm run upload --filePath=src/sample-data/data.csv
```

After loading, you can run

```
npm run users 'http://localhost:3000/users'
```

again to check the new data!

## Assumptions

- Only one sort parameter can be provided at once.
- If minimum and maximum inputs are incompatible (e.g. max < min), no error will
  be shown. Instead, a empty json object will be returned.
