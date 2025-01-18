# HTML Snipper

There are use cases for an admin to remove offered elements on a websites. Some
elements offer end users pathways which admin policy bans. This extension allows
an admin to configure html query targets and removal or such targets.

Sample Admin JSON policies.
```
{"config": {"Value": [{"url": "https://www.example.com", "continual": true, "html": [".example-class"]}]}}
```

Admin policy with RegEx site gating.
```
{"config": {"Value": [{"re": "[https|http]:\/\/[a-zA-Z]{3}.example.com", "continual": true, "html": [".example-class"]}]}}
```



## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for details.

## License

Apache 2.0; see [`LICENSE`](LICENSE) for details.

## Disclaimer

This project is not an official Google project. It is not supported by
Google and Google specifically disclaims all warranties as to its quality,
merchantability, or fitness for a particular purpose.
